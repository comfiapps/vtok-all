import requests

BASE_URL = "https://localhost:5000/api"


def countdownInfoTest():
    api_url = "{base}/time".format(base=BASE_URL)
    response = requests.get(api_url, verify=False)
    # json = response.json()
    # return json
    return response.status_code


def mintingStatusTest():
    api_url = "{base}/mitting".format(base=BASE_URL)
    response = requests.get(api_url, verify=False)
    return response.status_code


def whitelistIncludeTest(address):
    api_url = "{base}/addr/{id}".format(base=BASE_URL, id=address)
    response = requests.get(api_url, verify=False)
    return response.status_code


def countTotalMintingTest(minting_number):
    api_url = "{base}/count/{round}".format(base=BASE_URL, round=minting_number)
    response = requests.get(api_url, verify=False)
    return response.status_code


def addWhitelistTest(address):
    api_url = "{base}/sitin/{id}".format(base=BASE_URL, id=address)
    response = requests.post(api_url, verify=False)
    # TODO post body SitinDto
    return response.status_code


def ApprovalTest(address):
    api_url = "{base}/approval/{id}".format(base=BASE_URL, id=address)
    response = requests.post(api_url, verify=False)
    # TODO post body MittingDto
    return response.status_code
