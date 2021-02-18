import ads from './ads';

window.onload = async function () {
    const adContainer = document.getElementById('adContainer') as HTMLDivElement;
    const button = document.getElementById('button') as HTMLButtonElement;
    const input = document.getElementById('input') as HTMLInputElement;
    const url = input.value;

    await ads.Instance.initialize( adContainer,

        'http://googleads.g.doubleclick.net/pagead/ads?client=ca-video-afvtest&ad_type=video'
        );

    button.addEventListener('click', ()=>{
        ads.Instance.playAds();
    })





}