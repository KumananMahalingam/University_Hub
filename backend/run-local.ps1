# Load root .env into this PowerShell session, then start Spring Boot.
$envFile = Join-Path (Split-Path $PSScriptRoot -Parent) '.env'
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*([^#=\s][^=]*?)\s*=\s*(.*)$') {
            Set-Item -Path "Env:$($matches[1].Trim())" -Value $matches[2].Trim()
        }
    }
    Write-Host "Loaded environment from $envFile"
} else {
    Write-Warning ".env not found — set DB_PASSWORD and GEMINI_API_KEY manually."
}

Set-Location $PSScriptRoot
mvn spring-boot:run
