$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$publicRoot = Join-Path $projectRoot "public"
$sourceExtensions = @(".jpg", ".jpeg", ".png")
$imageFiles = Get-ChildItem -Path $publicRoot -Recurse -File | Where-Object {
  $sourceExtensions -contains $_.Extension.ToLowerInvariant()
}

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  throw "ffmpeg is required but was not found on PATH."
}

$replacements = @{}
foreach ($imageFile in $imageFiles) {
  $relativePath = $imageFile.FullName.Substring($publicRoot.Length).TrimStart("\", "/").Replace("\", "/")
  $webpPath = [IO.Path]::ChangeExtension($imageFile.FullName, ".webp")

  if (-not (Test-Path $webpPath)) {
    & ffmpeg -hide_banner -loglevel error -err_detect ignore_err -y -i $imageFile.FullName -c:v libwebp -quality 82 -compression_level 6 $webpPath
    if ($LASTEXITCODE -ne 0 -or -not (Test-Path $webpPath)) {
      throw "Failed to convert $($imageFile.FullName)."
    }
  }

  $sourceUrl = "/$relativePath"
  $webpUrl = "/$([IO.Path]::ChangeExtension($relativePath, ".webp"))"
  $replacements[$sourceUrl] = $webpUrl
}

$sourceFiles = Get-ChildItem -Path (Join-Path $projectRoot "src") -Recurse -File | Where-Object {
  $_.Extension -in @(".ts", ".tsx", ".js", ".jsx", ".css", ".md")
}
foreach ($sourceFile in $sourceFiles) {
  $content = [IO.File]::ReadAllText($sourceFile.FullName)
  $updatedContent = $content
  foreach ($replacement in $replacements.GetEnumerator()) {
    $updatedContent = $updatedContent.Replace($replacement.Key, $replacement.Value)
  }

  if ($updatedContent -cne $content) {
    [IO.File]::WriteAllText($sourceFile.FullName, $updatedContent)
  }
}

foreach ($imageFile in $imageFiles) {
  try {
    Remove-Item -LiteralPath $imageFile.FullName -Force -ErrorAction Stop
  } catch {
    Write-Warning "Could not remove $($imageFile.FullName); the WebP copy is still available."
  }
}

Write-Output "Converted $($imageFiles.Count) images to WebP and updated local source references."