# ----------------------------------------------------------------
# PowerShell Http Api Calling Module
# AKA curl.psm1
# Torres Frederic 2018
# ----------------------------------------------------------------
$httpOkStatusCodes = New-Object 'System.Collections.Generic.List[Int]'
$httpOkStatusCodes.Add(200);

function isHttpOk([int]$statusCode) {

    return ($httpOkStatusCodes.Contains($statusCode))
}
function apiGet($url) {

    $method = "Get"
    write-host "$method $url " -NoNewline
    $result = curl -Uri $url -Method $method
    if($result -eq $null) {
        throw "http call failed, server unavailable, url:$url"
    }

    write-host "status:$($result.StatusCode)-$($result.StatusDescription)"

    if(isHttpOk($result.StatusCode)) {

        $json = $result.Content

        if($json.Length -gt 0) { # HTTP content

            $psO = $json | ConvertFrom-Json

            if($psO.Length -eq 1) { # The array of 1 was converted into one object
                return ,$psO
            }
            else {
                return $psO # get item by id will return an instance get items will return an array
            }
        }
        else { # No HTTP content
            return $true
        }
    }
    throw "http get failed statusCode:$($result.StatusCode), url:$url"
}
function apiPost($url, $data, $method = "Post") {

    write-host "$method $url "  -NoNewline
    $result = curl -Uri $url -Method $method -Body $data
    write-host "status:$($result.StatusCode)"
    if(isHttpOk($result.StatusCode)) {
        # $result.Content is a byte array
        if($result.Content.Length -eq 0) {
            return $true # No HTTP content
        }
        else {
            $json = $result.Content
            $psO = $json | ConvertFrom-Json # Parse JSON
            return $psO
        }
    }
    throw "http $method failed statusCode:$($result.StatusCode), url:$url"
}
function apiPut($url, $data, $method = "Put") {

    return apiPost $url $data $method
}
function apiDelete($url, $data, $method = "Delete") {

    return apiPost $url $data $method
}



