# Video Optimization Guide

## Current Issue
Your videos are **extremely large** and causing slow playback:
- `travel-kit.mp4`: **69.10 MB** → should be **3-5 MB**
- `hero-video.mp4`: **46.52 MB** → should be **2-3 MB**
- Featured tour videos: **2.55-12.45 MB** → should be **500KB-2 MB**

## Quick Fix: Compress Videos with FFmpeg

### Installation
**Windows (using Chocolatey):**
```powershell
choco install ffmpeg
```

Or download from: https://ffmpeg.org/download.html

### Compression Scripts

#### 1. Hero Video (46.52 MB → ~2.5 MB)
```bash
ffmpeg -i hero-video.mp4 -c:v libvpx-vp9 -b:v 1500k -c:a libopus -b:a 96k hero-video.webm
ffmpeg -i hero-video.mp4 -c:v libx264 -preset fast -b:v 1500k -c:a aac -b:a 96k hero-video-optimized.mp4
```

#### 2. Travel Kit Video (69.10 MB → ~3.5 MB)
```bash
ffmpeg -i travel-kit.mp4 -c:v libvpx-vp9 -b:v 1800k -c:a libopus -b:a 96k travel-kit.webm
ffmpeg -i travel-kit.mp4 -c:v libx264 -preset fast -b:v 1800k -c:a aac -b:a 96k travel-kit-optimized.mp4
```

#### 3. Featured Tour Videos (2.55-12.45 MB → ~500KB-1.5 MB)
```bash
# Hunza Naltar (12.45 MB)
ffmpeg -i hunza-naltar.mp4 -c:v libvpx-vp9 -b:v 1200k -c:a libopus -b:a 80k hunza-naltar.webm
ffmpeg -i hunza-naltar.mp4 -c:v libx264 -preset fast -b:v 1200k -c:a aac -b:a 80k hunza-naltar-optimized.mp4

# Hunza Skardu (4.72 MB)
ffmpeg -i hunza-skardu.mp4 -c:v libvpx-vp9 -b:v 900k -c:a libopus -b:a 80k hunza-skardu.webm
ffmpeg -i hunza-skardu.mp4 -c:v libx264 -preset fast -b:v 900k -c:a aac -b:a 80k hunza-skardu-optimized.mp4

# Kashmir Taobat (8.97 MB)
ffmpeg -i kashmir-taobat.mp4 -c:v libvpx-vp9 -b:v 1200k -c:a libopus -b:a 80k kashmir-taobat.webm
ffmpeg -i kashmir-taobat.mp4 -c:v libx264 -preset fast -b:v 1200k -c:a aac -b:a 80k kashmir-taobat-optimized.mp4

# Skardu Shigar Shangrila (2.55 MB)
ffmpeg -i skardu-shigar-shangrila.mp4 -c:v libvpx-vp9 -b:v 800k -c:a libopus -b:a 64k skardu-shigar-shangrila.webm
ffmpeg -i skardu-shigar-shangrila.mp4 -c:v libx264 -preset fast -b:v 800k -c:a aac -b:a 64k skardu-shigar-shangrila-optimized.mp4
```

### Batch Compression Script (PowerShell)

Save as `compress-videos.ps1`:

```powershell
$videosDir = ".\public\videos"
$targetBitrates = @{
    "hunza-naltar.mp4" = 1200
    "hunza-skardu.mp4" = 900
    "kashmir-taobat.mp4" = 1200
    "skardu-shigar-shangrila.mp4" = 800
}

foreach ($video in Get-ChildItem $videosDir -Filter "*.mp4") {
    $bitrate = $targetBitrates[$video.Name]
    if (-not $bitrate) { $bitrate = 900 }
    
    $nameWithoutExt = [System.IO.Path]::GetFileNameWithoutExtension($video.Name)
    
    Write-Host "Compressing $($video.Name) at ${bitrate}k..."
    
    # WebM (VP9)
    & ffmpeg -i $video.FullName `
        -c:v libvpx-vp9 -b:v "${bitrate}k" `
        -c:a libopus -b:a 96k `
        -filter:v scale=1920:1080 `
        "$videosDir\$nameWithoutExt.webm"
    
    # MP4 backup
    & ffmpeg -i $video.FullName `
        -c:v libx264 -preset fast -b:v "${bitrate}k" `
        -c:a aac -b:a 96k `
        -filter:v scale=1920:1080 `
        "$videosDir\$nameWithoutExt-opt.mp4"
}

# Compress root videos
@("hero-video.mp4", "travel-kit.mp4") | ForEach-Object {
    $targetBitrate = $_ -eq "hero-video.mp4" ? 1500 : 1800
    $inputFile = ".\public\$_"
    $nameWithoutExt = [System.IO.Path]::GetFileNameWithoutExtension($_)
    
    Write-Host "Compressing $_ at ${targetBitrate}k..."
    
    & ffmpeg -i $inputFile `
        -c:v libvpx-vp9 -b:v "${targetBitrate}k" `
        -c:a libopus -b:a 96k `
        -filter:v scale=1920:1080 `
        ".\public\$nameWithoutExt.webm"
    
    & ffmpeg -i $inputFile `
        -c:v libx264 -preset fast -b:v "${targetBitrate}k" `
        -c:a aac -b:a 96k `
        -filter:v scale=1920:1080 `
        ".\public\$nameWithoutExt-opt.mp4"
}

Write-Host "✅ Compression complete!"
```

Run with:
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
.\compress-videos.ps1
```

## Expected Results

| Video | Current | Target | Format |
|-------|---------|--------|--------|
| travel-kit.mp4 | 69.10 MB | 3.5 MB | WebM/MP4 |
| hero-video.mp4 | 46.52 MB | 2.5 MB | WebM/MP4 |
| hunza-naltar.mp4 | 12.45 MB | 1.2 MB | WebM/MP4 |
| kashmir-taobat.mp4 | 8.97 MB | 1.2 MB | WebM/MP4 |
| hunza-skardu.mp4 | 4.72 MB | 900 KB | WebM/MP4 |
| skardu-shigar-shangrila.mp4 | 2.55 MB | 800 KB | WebM/MP4 |

**Total reduction: ~143 MB → ~13 MB (90% smaller!)**

## Deployment Steps

1. **Compress all videos locally** using the scripts above
2. **Replace original MP4s** with optimized versions in `public/` and `public/videos/`
3. **Keep .webm files** - they're the primary format (modern browsers support them)
4. **MP4 fallback** is provided for older browsers
5. **Deploy** - videos will now load in seconds instead of minutes

## Why This Works

- **WebM format**: Uses VP9 codec (50-60% better compression than H.264)
- **Lower bitrates**: 800-1800 kbps optimal for streaming over typical connections
- **Lazy loading**: Videos only load when visible (`IntersectionObserver`)
- **Multiple formats**: WebM first (fast) → MP4 fallback (compatibility)
- **Preload="none"**: Prevents forcing full download before playback

## Caching Headers (Server Configuration)

Add to `next.config.ts` for better caching:

```typescript
headers: async () => [
  {
    source: '/videos/:path*',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      { key: 'Content-Type', value: 'video/:path*' },
    ],
  },
],
```

## Testing

After compression, test playback:
- ✅ Check videos load in < 2 seconds
- ✅ Verify on slow 3G connection (Chrome DevTools)
- ✅ Test on mobile devices
- ✅ Confirm hover videos play smoothly
