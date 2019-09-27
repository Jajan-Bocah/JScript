// ==UserScript==
// @name         Auto Klik
// @namespace    http://www.emm-emm.com/
// @version      1.3.7
// @description  Auto Klik Donlotan wakakaka
// @author       eZee
// @icon         https://graph.facebook.com/1750572307/picture
// @updateURL    https://github.com/jajanbocah/otoklik/raw/master/otoklik.user.js

// @match        *://welcome.indihome.co.id/landing-page

// @match        *://*.hexafile.net/*
// @match        *://*.wahibirawan.com/*

// @match        *://*.tetew.info/*
// @match        *://*.greget.space/*
// @match        *://*.siherp.com/*
// @match        *://*.ahexa.com/*
// @match        *://*.anjay.info/*

// @match        *://davinsurance.com/*

// @match        *://ngantukberat.me/*

// @match        *://*.safelinkreviewx.com/*/cost/*

// @match        *://*.zippyshare.com/v/*
// @match        *://drive.google.com/file/d/*
// @match        *://*.zxcfiles.com/download
// @match        *://*.zxcfiles.xyz/*
// @match        *://*.mediafire.com/file/*
// @match        *://elsfile.org/*
// @match        *://*.clicknupload.org/*
// @match        *://*.racaty.com/*

// @license      GNU GPLv3
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @run-at       document-start
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var fulldomen,domen, link, anu = 0, tipe, mod, jdl, aidi;
var str, stt, a, b ,c;
$(document).ready(function() {
    domen = document.documentURI;
    if(domen.match(/welcome.indihome.co.id/g)){
        link = $("div.background-box").find("a").attr("href");
    // Url Shorter
    } else if(domen.match(/hexafile.net/g)){
        if(document.documentURI.match(/v1\./g)){
            str = document.getElementsByTagName('script');
            stt = str[18].text.split('="')[1].split('",');
            link = stt[0];
        } else {
            str = document.getElementsByTagName('script');
            stt = str[6].text.split('window.location="')[1].split('";');
            link = stt[0];
        }
    } else if(document.documentURI.match(/wahibirawan.com\//g)){
        tipe = 'klik';
        link = $("div#showlink");
    } else if(domen.match(/tetew.info|greget.space|siherp.com|ahexa.com/g)){
        link = $("div.download-link").find("a").attr("href");
    } else if(domen.match(/anjay.info/g)){
        str = document.getElementsByTagName('script');
        stt = str[4].text.split("changeLink(){var a='")[1].split("';");
        link = stt[0];
    } else if(document.documentURI.match(/davinsurance.com\//g)){
        if(document.documentURI.match(/\?id=/g)){
            tipe='klik';
            link = $("input.sorasubmit");
        } else {
             str = document.getElementsByTagName('script');
             stt = str[10].text.split("changeLink(){var a='")[1].split("';");
             link = stt[0];
        }
    } else if(document.documentURI.match(/ngantukberat.me\//g)){
        if(document.documentURI.match(/\?go=/g)){
            tipe='klik';
            link = $("input.btn-primary");
        } else {
             link = $("div#wpsafe-link").find("a").attr("href");
        }
    } else if(document.documentURI.match(/safelinkreviewx.com/g )){
        var a = $("div.button").attr("onclick").replace("window.open('", "").replace("&pop=2', '_blank');", "");
        link = a.replace("decrypt2.safe", "decrypt.safe");
    // Situs Download
    } else if(domen = domen.match(/zippyshare.com/g )){
        if($("a#dlbutton").length){ link = $("a#dlbutton").attr("href"); }
    } else if(document.documentURI.match(/drive.google.com\/file\/d\//g)){
            a = document.documentURI.replace("/file/d/", "/uc?id=");
            b = a.split("/view");
            c = b[0].split("/edit");
            link = c[0] + "&export=download";
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
    } else if(document.documentURI.match(/elsfile.org\//g )){
        tipe = 'klik';
        if($("input#btn_download").length){
            jdl = document.getElementById("btn_download").value;
            link = $("input#btn_download");
        }
        else{
            aidi = document.documentURI.replace("http://elsfile.org/", "");
            $("#frmdlcenter").html(
                '<form method="POST">'+
                '<input type="hidden" name="op" value="download1">'+
                '<input type="hidden" name="usr_login" value="C">'+
                '<input type="hidden" name="id" value="'+ aidi +'">'+
                '<input type="hidden" name="referer" value="q">'+
                '<input type="submit" name="method_free" value="Free Download" style="background-color:#3f3f3f !important;color:#f1f1f1 !important;font-weight:bold !important;">'+
                '</form>'
            );
            jdl = document.getElementsByName("method_free")[0].value;
            link = $("input[name=method_free]");
        }
    } else if(document.documentURI.match(/clicknupload.org\//g )){
        if($("span.downloadbtn").length){
            tipe = 'klik';
            jdl = document.getElementsByClassName('downloadbtn')[1].textContent;
            link = $("span.downloadbtn");
        } else if($("div.download").find('downloadbtn').find('span').context.activeElement.innerText.length > 0){
            tipe = '';
            jdl = $("div.download").find('downloadbtn').find('span').context.activeElement.innerText
            link = $("button.downloadbtn").attr('onclick').replace("window.open('", "").replace("');" + '"', "");
        }
        else{
            tipe = 'klik';
            aidi = document.documentURI.replace("http://clicknupload.org/", "").replace("https://clicknupload.org/", "");
            $("div#download").html(
                '<form method="POST" action="">' +
                '<input type="hidden" name="op" value="download1">' +
                '<input type="hidden" name="usr_login" value="">' +
                '<input type="hidden" name="id" value="'+ aidi +'">' +
                '<div class="regular"><i class="far fa-tachometer-alt-slow"></i> <input type="submit" id="method_free" name="method_free" value="Free Download >>"></div>' +
                '</form>'
            );
            jdl = document.getElementsByName("method_free")[0].value;
            link = $("input[name=method_free]");
        }
    } else if(document.documentURI.match(/racaty.com\//g )){
        var atext = $("div.after").text();
        if( atext !== '' ){
            tipe = 'klik';
            link = $("div.after");
        } else {
            tipe = '';
            link = $("div#DIV_1.actions").find("a").attr("href");
        }
    }

    if(link!==""){
        setTimeout(function(){
            if(tipe == 'klik'){
                klik(link, jdl);
            } else if(tipe == 'submit'){
                submit(link, jdl);
            } else mangkat(link);
        }, (anu * 1000));
    }
});

function klik(url,tbl){
    var jdul;
    if(url.click()){
        if( url.text().length > 0 ){
            jdul = url.text();
        } else {
            if(tbl!==""){ jdul = tbl }else jdul = url
        }
        document.title = 'Mencet Tombol "' + jdul + '"';
    } else {
        document.title = url;
    }
}
function submit(btn,tbl){
    var jdul;
    if(btn.submit()){
        if( tbl.text().length > 0 ){
            jdul = tbl.text();
        } else {
            if(tbl!==""){ jdul = tbl }else jdul = btn;
            document.title = 'Submit Form "'+ jdul + '"';
        }
    } else {
        document.title = btn;
    }
}
function mangkat(url){
    document.title = 'Cuss '+url;
    window.location.replace(url);
}
