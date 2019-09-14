// ==UserScript==
// @name         Auto Klik
// @namespace    http://www.emm-emm.com/
// @version      1.3.0
// @description  Auto Klik Donlotan wakakaka
// @author       eZee
// @icon         https://graph.facebook.com/1750572307/picture
// @updateURL    https://github.com/jajanbocah/otoklik/raw/master/otoklik.user.js

// @match        *://welcome.indihome.co.id/landing-page
// @match        *://*.hexafile.net/*

// @match        *://*.tetew.info/*
// @match        *://*.greget.space/*
// @match        *://*.siherp.com/*
// @match        *://*.ahexa.com/*

// @match        *://davinsurance.com/*

// @match        *://*.safelinkreviewx.com/*/cost/*

// @match        *://*.zippyshare.com/v/*
// @match        *://drive.google.com/file/d/*
// @match        *://*.zxcfiles.com/download
// @match        *://*.zxcfiles.xyz/*
// @match        *://*.mediafire.com/file/*
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var fulldomen,domen, link, anu = 0, tipe, mod, jdl;
var str, stt, a, b ,c;
$(document).ready(function() {
    //domen = document.domain;
    domen = document.documentURI;
    if(domen.match(/welcome.indihome.co.id/g)){
        link = $("div.background-box").find("a").attr("href");
    } else if(domen.match(/hexafile.net/g)){
        str = document.getElementsByTagName('script');
        stt = str[6].text.split('window.location="')[1].split('";');
        link = stt[0];
    } else if(domen.match(/tetew.info|greget.space|siherp.com|ahexa.com/g)){
        link = $("div.download-link").find("a").attr("href");
    } else if(domen = domen.match(/zippyshare.com/g )){
        link = $("a#dlbutton").attr("href");
    } else if(document.documentURI.match(/drive.google.com\/file\/d\//g)){
            a = document.documentURI.replace("/file/d/", "/uc?id=");
            b = a.split("/view");
            c = b[0].split("/edit");
            link = c[0] + "&export=download";
    } else if(document.documentURI.match(/davinsurance.com\//g)){
        if(document.documentURI.match(/\?id=/g)){
            tipe='klik';
            link = $("input.sorasubmit");
        } else {
             str = document.getElementsByTagName('script');
             stt = str[10].text.split("changeLink(){var a='")[1].split("';");
             link = stt[0];
        }
    } else if(document.documentURI.match(/safelinkreviewx.com/g )){
        var a = $("div.button").attr("onclick").replace("window.open('", "").replace("&pop=2', '_blank');", "");
        link = a.replace("decrypt2.safe", "decrypt.safe");
    } else if(document.documentURI.match(/zxcfiles.com/g )){
        var atext = $("span#download").text();
        if( atext == '' ){
            tipe = 'klik';
            link = $("button.downloadbtn");
        } else link = $("span#download").find("a").attr("href");
    } else if(document.documentURI.match(/zxcfiles.xyz/g )){
            link = $("div.btn-group").find("a").attr("href");
    } else if(document.documentURI.match(/mediafire.com\/file\//g )){
        link = $("div.download_link").find("a.input").attr("href");
    }

    setTimeout(function(){
        if(tipe == 'klik'){
            klik(link);
        } else {
            mangkat(link);
        }
    }, (anu * 1000));

});

function klik(url){
    if(url.click()){
        document.title = 'Mencet Tombol '+ url.text();
    } else {
        document.title = jdl;
    }
}
function mangkat(url){
    document.title = 'Cuss '+url;
    window.location.replace(url);
}
