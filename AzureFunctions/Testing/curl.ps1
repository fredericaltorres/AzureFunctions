
Import-Module ".\curl.psm1" -Force

cls

$BaseUrl = "http://localhost:7071/api"

$TestResultUrl = "$BaseUrl/test/reset"
$result = apiGet $TestResultUrl

Assert-Verbose $true
Assert-AreEqual $true $result

$TestResultUrl = "$BaseUrl/todo"
$result = apiGet $url
Assert-AreEqual 0 $result.Length

$desc = "Hello $([System.Environment]::TickCount)"
$json = '{TaskDescription:"'+$desc+'"}'
$result = apiPost $url $json
"New todo created $($result.id)"

$result = apiGet $url
Assert-AreEqual 1 $result.Length "Verify array length"
