# ----------------------------------------------------------------
# PowerShell Assertion Module
# Torres Frederic 2018
# ----------------------------------------------------------------

$global:assertVerbose = $false

function Assert-Verbose($OnOff) {
    $global:assertVerbose = $OnOff
}

function Assert-AreEqual ($val1, $val2, $message = $null) {
    $preMessage = "[Assert-AreEqual]"
    $postMessage = "Expected to be equal '{0}' and '{1}'" -f @($val1, $val2)
    if($message -eq $null) {
        $message = $preMessage + $postMessage
    }
    else {
        $message = $preMessage + $message +' - '+ $postMessage 

    }
    if($val1 -eq $val2) {
        if($global:assertVerbose) {
            Write-Host $message -ForegroundColor Green
        }
        return $true
    }
    else {
        Write-Error $message
        throw $message
        return $false
    }
}

Export-ModuleMember -Function Assert-AreEqual, Assert-Verbose

