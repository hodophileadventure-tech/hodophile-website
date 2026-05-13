#!/usr/bin/env pwsh
# Video compression script using FFmpeg with VP9 (WebM) and H.264 (MP4) codecs

$ErrorActionPreference = "Stop"
$PSNativeCommandUseErrorActionPreference = $false

# Resolve FFmpeg even when the current shell has not refreshed PATH.
$ffmpeg = $null
try {
    $ffmpeg = (Get-Command ffmpeg -ErrorAction Stop).Source
} catch {
    $candidate = Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
    if (Test-Path $candidate) {
        $ffmpeg = $candidate
    }
}

if (-not $ffmpeg) {
    Write-Host "[ERROR] FFmpeg not found. Install it first:" -ForegroundColor Red
    Write-Host "   winget install --id Gyan.FFmpeg -e" -ForegroundColor Yellow
    Write-Host "   Or download from: https://ffmpeg.org/download.html" -ForegroundColor Yellow
    exit 1
}

Write-Host "[OK] FFmpeg found at $ffmpeg" -ForegroundColor Green

function Invoke-FFmpeg {
    param(
        [Parameter(Mandatory = $true)]
        [string[]] $Arguments
    )

    $process = Start-Process -FilePath $ffmpeg -ArgumentList $Arguments -NoNewWindow -Wait -PassThru
    if ($process.ExitCode -ne 0) {
        throw "FFmpeg failed with exit code $($process.ExitCode)"
    }
}

$videosDir = ".\public\videos"
$rootVideos = @(
    @{ name = "hero-video.mp4"; bitrate = 1500; path = ".\public" },
    @{ name = "travel-kit.mp4"; bitrate = 1800; path = ".\public" }
)

$featuredVideos = @(
    @{ name = "hunza-naltar.mp4"; bitrate = 1200 },
    @{ name = "hunza-skardu.mp4"; bitrate = 900 },
    @{ name = "kashmir-taobat.mp4"; bitrate = 1200 },
    @{ name = "skardu-shigar-shangrila.mp4"; bitrate = 800 }
)

Write-Host "`n=== Starting video compression ===" -ForegroundColor Cyan

# Compress root videos (hero and travel kit)
foreach ($video in $rootVideos) {
    $inputPath = Join-Path $video.path $video.name
    $outputWebM = Join-Path $video.path "$([System.IO.Path]::GetFileNameWithoutExtension($video.name)).webm"
    $outputMP4 = Join-Path $video.path "$([System.IO.Path]::GetFileNameWithoutExtension($video.name))-opt.mp4"
    
    if (-not (Test-Path $inputPath)) {
        Write-Host "[SKIP] $($video.name) - file not found" -ForegroundColor Yellow
        continue
    }
    
    $fileSize = [math]::Round((Get-Item $inputPath).Length / 1MB, 2)
    Write-Host "`n[PROCESS] $($video.name) ($fileSize MB)" -ForegroundColor Cyan
    
    # Compress to WebM (VP9)
    Write-Host "  [*] WebM format (VP9) at $($video.bitrate)k..." -ForegroundColor Gray
    Invoke-FFmpeg @(
        "-i", $inputPath,
        "-c:v", "libvpx-vp9",
        "-b:v", "$($video.bitrate)k",
        "-deadline", "realtime",
        "-cpu-used", "8",
        "-row-mt", "1",
        "-tile-columns", "2",
        "-tile-rows", "1",
        "-threads", "4",
        "-c:a", "libopus",
        "-b:a", "96k",
        "-filter:v", "scale=1920:1080",
        "-y", $outputWebM
    )
    
    if (Test-Path $outputWebM) {
        $webmSize = [math]::Round((Get-Item $outputWebM).Length / 1MB, 2)
        $reduction = [math]::Round(((1 - ($webmSize / $fileSize)) * 100), 1)
        Write-Host "  [DONE] WebM: $webmSize MB (${reduction}% smaller)" -ForegroundColor Green
    }
    
    # Backup to MP4 (H.264)
    Write-Host "  [*] MP4 format (H.264) at $($video.bitrate)k..." -ForegroundColor Gray
    Invoke-FFmpeg @(
        "-i", $inputPath,
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", "28",
        "-c:a", "aac",
        "-b:a", "96k",
        "-filter:v", "scale=1920:1080",
        "-y", $outputMP4
    )
    
    if (Test-Path $outputMP4) {
        $mp4Size = [math]::Round((Get-Item $outputMP4).Length / 1MB, 2)
        Write-Host "  [DONE] MP4: $mp4Size MB" -ForegroundColor Green
    }
}

# Compress featured tour videos
if (Test-Path $videosDir) {
    foreach ($video in $featuredVideos) {
        $inputPath = Join-Path $videosDir $video.name
        
        if (-not (Test-Path $inputPath)) {
            Write-Host "[SKIP] $($video.name) - file not found" -ForegroundColor Yellow
            continue
        }
        
        $fileSize = [math]::Round((Get-Item $inputPath).Length / 1MB, 2)
        Write-Host "`n[PROCESS] $($video.name) ($fileSize MB)" -ForegroundColor Cyan
        
        $nameWithoutExt = [System.IO.Path]::GetFileNameWithoutExtension($video.name)
        $outputWebM = Join-Path $videosDir "$nameWithoutExt.webm"
        $outputMP4 = Join-Path $videosDir "$nameWithoutExt-opt.mp4"
        
        # Compress to WebM (VP9)
        Write-Host "  [*] WebM format (VP9) at $($video.bitrate)k..." -ForegroundColor Gray
        Invoke-FFmpeg @(
            "-i", $inputPath,
            "-c:v", "libvpx-vp9",
            "-b:v", "$($video.bitrate)k",
            "-deadline", "realtime",
            "-cpu-used", "8",
            "-row-mt", "1",
            "-tile-columns", "2",
            "-tile-rows", "1",
            "-threads", "4",
            "-c:a", "libopus",
            "-b:a", "80k",
            "-filter:v", "scale=1920:1080",
            "-y", $outputWebM
        )
        
        if (Test-Path $outputWebM) {
            $webmSize = [math]::Round((Get-Item $outputWebM).Length / 1MB, 2)
            $reduction = [math]::Round(((1 - ($webmSize / $fileSize)) * 100), 1)
            Write-Host "  [DONE] WebM: $webmSize MB (${reduction}% smaller)" -ForegroundColor Green
        }
        
        # Backup to MP4 (H.264)
        Write-Host "  [*] MP4 format (H.264) at $($video.bitrate)k..." -ForegroundColor Gray
        Invoke-FFmpeg @(
            "-i", $inputPath,
            "-c:v", "libx264",
            "-preset", "veryfast",
            "-crf", "28",
            "-c:a", "aac",
            "-b:a", "80k",
            "-filter:v", "scale=1920:1080",
            "-y", $outputMP4
        )
        
        if (Test-Path $outputMP4) {
            $mp4Size = [math]::Round((Get-Item $outputMP4).Length / 1MB, 2)
            Write-Host "  [DONE] MP4: $mp4Size MB" -ForegroundColor Green
        }
    }
}

Write-Host "`n=== COMPRESSION COMPLETE ===" -ForegroundColor Cyan
Write-Host "`nSummary:" -ForegroundColor Cyan

# Calculate total sizes
$originalSize = 0
$compressedSize = 0

# Check root videos
foreach ($video in $rootVideos) {
    $inputPath = Join-Path $video.path $video.name
    if (Test-Path $inputPath) {
        $originalSize += (Get-Item $inputPath).Length
    }
}

# Check featured videos
if (Test-Path $videosDir) {
    foreach ($video in $featuredVideos) {
        $inputPath = Join-Path $videosDir $video.name
        if (Test-Path $inputPath) {
            $originalSize += (Get-Item $inputPath).Length
        }
    }
}

# Calculate compressed sizes
Get-ChildItem ".\public" -Filter "*-opt.mp4" | ForEach-Object { $compressedSize += $_.Length }
Get-ChildItem ".\public" -Filter "*.webm" | ForEach-Object { $compressedSize += $_.Length }
Get-ChildItem ".\public\videos" -Filter "*-opt.mp4" -ErrorAction SilentlyContinue | ForEach-Object { $compressedSize += $_.Length }
Get-ChildItem ".\public\videos" -Filter "*.webm" -ErrorAction SilentlyContinue | ForEach-Object { $compressedSize += $_.Length }

$originalMB = [math]::Round($originalSize / 1MB, 2)
$compressedMB = [math]::Round($compressedSize / 1MB, 2)
$reduction = [math]::Round(((1 - ($compressedSize / $originalSize)) * 100), 1)

Write-Host "  Original:   $originalMB MB"
Write-Host "  Compressed: $compressedMB MB" -ForegroundColor Green
Write-Host "  Reduction:  ${reduction}% smaller" -ForegroundColor Green

Write-Host "`nNew files created:" -ForegroundColor Cyan
Write-Host "  *.webm files (primary - use these!)" -ForegroundColor Green
Write-Host "  *-opt.mp4 files (fallback for old browsers)" -ForegroundColor Green

Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "  1. Test videos on your domain to verify quality"
Write-Host "  2. If satisfied, replace original .mp4 files with -opt.mp4 versions"
Write-Host "  3. Deploy: npm run build && push to production"
