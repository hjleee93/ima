import ads from './ads';

window.onload = async function () {
    const adContainer = document.getElementById('adContainer') as HTMLDivElement;
    const button = document.getElementById('button') as HTMLButtonElement;
    const input = document.getElementById('input') as HTMLInputElement;
    const url = input.value;

    await ads.Instance.initialize( adContainer,

        'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-video-pub-2579189069606201&videoad_start_delay=0&hl=vi&max_ad_duration=15000&sdmax=30000'
        
        );

    button.addEventListener('click', ()=>{
        ads.Instance.playAds();
    })





}