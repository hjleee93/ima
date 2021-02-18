import {EventEmitter} from 'events';
// import {consoleLog} from "@/scripts/consoleLog";


export default class Ads extends EventEmitter {

    private static _instance : Ads = null;
    static get Instance() {
        if( !this._instance ) {
            this._instance = new Ads();
        }
        return this._instance;
    }

    event : EventEmitter = new EventEmitter();

    private adContainer : HTMLDivElement = null;
    private adDisplayContainer : any;
    private adsLoader : any;
    private adsManager : any;

    private _available : boolean = false;
    get available() : boolean {
        return this._available;
    }

    private constructor() {
        super();
        window.addEventListener('resize', ()=>{
            if(this.adsManager) {
                const width = this.adContainer.clientWidth;
                const height = this.adContainer.clientHeight;
                //@ts-ignore
                this.adsManager.resize(width, height, google.ima.ViewMode.NORMAL);
            }
        })
    }

    async initialize( adContainer : HTMLDivElement, adTagUrl? : string) {

        this.adContainer = adContainer;

        //@ts-ignore
        this.adDisplayContainer = new google.ima.AdDisplayContainer( this.adContainer );
        //@ts-ignore
        this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);

        //@ts-ignore
        this.adsLoader.addEventListener( google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded.bind(this), false);

        //@ts-ignore
        this.adsLoader.addEventListener( google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this), false);

        this.request(adTagUrl);
    }

    request( url? : string ) {

        if( this.adsLoader ) {
            this.adsLoader.contentComplete();
        }

        //@ts-ignore
        const adsRequest = new google.ima.AdsRequest();
        adsRequest.adTagUrl = url || 'https://pubads.g.doubleclick.net/gampad/ads?' +
            'sz=640x480&' +
            'iu=/124319096/external/single_ad_samples&' +
            'ciu_szs=300x250&' +
            'impl=s&' +
            'gdfp_req=1&' +
            'env=vp&' +
            'output=vast&' +
            'unviewed_position_start=1&' +
            'cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&' +
            'correlator=';
        // adsRequest.adTagUrl = 'http://googleads.g.doubleclick.net/pagead/ads?' +
        //     'ad_type=video&' +
        //     'client=ca-games-pub-4968145218643279&' +
        //     'videoad_start_delay=0&' +
        //     'description_url=http%3A%2F%2Fwww.google.com&' +
        //     'max_ad_duration=20000&' +
        //     'adtest=on';
        // adsRequest.adTagUrl = 'http://googleads.g.doubleclick.net/pagead/ads?' +
        //     'ad_type=video&' +
        //     'client=ca-games-pub-4968145218643279&' +
        //     'videoad_start_delay=0&' +
        //     'description_url=http%3A%2F%2Fwww.google.com&' +
        //     'max_ad_duration=20000&' +
        //     'adtest=on';

        this.adsLoader.requestAds(adsRequest);
    }

    playAds() {
        this.adContainer.style.visibility = 'visible';
        this._available = false;
        this.adDisplayContainer.initialize();

        try {
            const width = this.adContainer.clientWidth;
            const height = this.adContainer.clientHeight;

            //@ts-ignore
            this.adsManager.init(width, height, google.ima.ViewMode.NORMAL);
            this.adsManager.start();
        } catch (adError) {

        }
    }


    onAdsManagerLoaded(adsManagerLoadedEvent : any) {


        // consoleLog.log( '----------  onAdsManagerLoaded  ----------' );

        this._available = true;
        this.adsManager = adsManagerLoadedEvent.getAdsManager();

        //@ts-ignore
        this.adsManager.addEventListener( google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this));

        //@ts-ignore
        this.adsManager.addEventListener(  google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.onContentPauseRequested.bind(this));
        //@ts-ignore
        this.adsManager.addEventListener( google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.onContentResumeRequested.bind(this));


        //@ts-ignore
        this.adsManager.addEventListener( google.ima.AdEvent.Type.LOADED, this.onAdLoaded.bind(this));
        //@ts-ignore
        this.adsManager.addEventListener( google.ima.AdEvent.Type.COMPLETE, this.onAdCompeted.bind(this));

        //@ts-ignore
        this.adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, this.onAdStarted.bind(this));
    }

    onAdError(adErrorEvent : any) {
        if(this.adsManager) {
            this.adsManager.destroy();
        }
    }

    onContentPauseRequested() {
        this.adContainer.style.visibility = 'visible';
        this.event.emit( 'pause' );
    }

    onContentResumeRequested() {
        this.request();
        this.adContainer.style.visibility = 'hidden';
        this.event.emit( 'resume' );
    }

    onAdLoaded(adEvent : any) {
        const ad = adEvent.getAd();
        if (!ad.isLinear()) {
            // videoElement.play();
            // console.log( 'isLinear' );
        }
    }

    onAdCompeted(adEvent : any) {

    }

    onAdStarted(adEvent : any) {

    }
}
