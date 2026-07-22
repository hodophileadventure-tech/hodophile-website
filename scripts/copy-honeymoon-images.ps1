# Copy honeymoon card images from Desktop into the site public folder
# Update the source paths below if your files are in a different location.

$dest = Join-Path -Path $PSScriptRoot -ChildPath "..\public\images\honeymoon"
if (-not (Test-Path -Path $dest)) {
    New-Item -ItemType Directory -Path $dest -Force | Out-Null
}

# Source files (from your message)
$files = @(
    "C:\Users\HP\OneDrive\Desktop\RGmrc2buEhMTxPw3qS26ypZYM7M-jFS2o2AAKze5eJV5BuuB7QUOjSOrpxbEiBK8MnaUpuY2z0gVXxBjyyRh6dhU_bI7oJaTNhuol66yLhC7oGAJ7wdDmsXx6dfhvCJbrbYphTG5zAyNwUDQwDfkadLr6iSeL0YV6knlTGP7a3zfvgdx7rDSH4JrkI_hFEFj.jpg",
    "C:\Users\HP\OneDrive\Desktop\r4fDx-QP_CrilcW-zsxFFFYRJ1YYi_Co-0I4Rtp6CM12K_PYqdArUXw64EENXqLbX90PxAQs5MNj2c8WAPvQbj1eqmFVuBnWjTFVkTyFgnCPQjQ3AuUqpxvf3Sclv-66AKytBUE9iXZbVTbbZtXJ08YWITUw1-XbMafjCCDL31iE3Svno1mkiVcx9_w2v4WI.jpg",
    "C:\Users\HP\OneDrive\Desktop\932tlaqYR_Tp3GVEHX38x2UCPub0WzGtrKlKqeg1abalf24y98fpG4_ptnxppndR1I1szJgitwPofm3_wK31QCaLqQdEI49zi9DDyim3xdaAJ5izWgi44UpQOMQuS7bJbzaNYtjryKXLO2Z_fAev4Sq-D26lCEX4eybBYX_B2zy3BxLWOafjYyz_qmQmTLhi.jpg"
)

$map = @{
    $files[0] = "swat-kalam.jpg"
    $files[1] = "naran-babusar.jpg"
    $files[2] = "kashmir-arangkel.jpg"
}

foreach ($src in $files) {
    if (-not (Test-Path -Path $src)) {
        Write-Warning "Source file not found: $src"
        continue
    }
    $fileName = $map[$src]
    $destPath = Join-Path -Path $dest -ChildPath $fileName
    Copy-Item -Path $src -Destination $destPath -Force
    Write-Output "Copied $src -> $destPath"
}

Write-Output "Done. If you see warnings, please verify the source paths are correct."
