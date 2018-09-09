
Import-Module ".\curl.psm1" -Force

cls

$BaseUrl = "http://localhost:7071/api"

$url = "$BaseUrl/test/reset"
$result = apiGet $url

Assert-Verbose $true
Assert-AreEqual $true $result | Out-Null

$url = "$BaseUrl/todo"
$result = apiGet $url
Assert-AreEqual 0 $result.Length | Out-Null

function createNewTodo() {
    $desc = "Hello $([System.Environment]::TickCount)"
    $json = '{TaskDescription:"'+$desc+'"}'
    $result = apiPost $url $json
    "New todo created $($result.id)"
    return $desc
}
$desc = createNewTodo

$result = apiGet $url
Assert-AreEqual 1 $result.Length "Verify array length" | Out-Null
Assert-AreEqual $desc $result[0].TaskDescription
