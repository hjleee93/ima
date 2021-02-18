import ads from './ads';

window.onload = async function () {
    const adContainer = document.getElementById('adContainer') as HTMLDivElement;
    const button = document.getElementById('button') as HTMLButtonElement;
    const input = document.getElementById('input') as HTMLInputElement;
    const url = input.value;

    await ads.Instance.initialize( adContainer,

        'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&vid=short_onecue&correlator='
        );

    button.addEventListener('click', ()=>{
        ads.Instance.playAds();
    })





}