// ==UserScript==
// @name         Auto Klik
// @namespace    http://j.mp/au_ah_gelap
// @version      1.3.13
// @description  Auto Klik oploverz, samehadaku, anoboy, dkk
// @author       eZee
// @icon         https://graph.facebook.com/1750572307/picture
// @updateURL    https://github.com/jajanbocah/JScript/raw/master/otoklik.user.js

// @match        *://welcome.indihome.co.id/landing-page

// @match        *://*.kusonime.com/*

// @match        *://*.oploverz.in/*
// @match        *://*.hexafile.net/*
// @match        *://*.wahibirawan.com/*

// @match        *://*.tetew.info/*
// @match        *://*.greget.space/*
// @match        *://*.siherp.com/*
// @match        *://*.ahexa.com/*
// @match        *://*.anjay.info/*

// @match        *://*.davinsurance.com/*

// @match        *://*.ngantukberat.me/*

// @match        *://*.safelinkreviewx.com/*/cost/*

// @match        *://*.ljutkeunvpn.blogspot.com/p/*

// @match        *://*.zippyshare.com/v/*
// @match        *://drive.google.com/*
// @match        *://*.zxcfiles.com/download
// @match        *://*.zxcfiles.xyz/*
// @match        *://*.mediafire.com/file/*
// @match        *://*.elsfile.org/*
// @match        *://*.clicknupload.org/*
// @match        *://*.racaty.com/*
// @match        *://*.letsupload.co/*
// @match        *://*.uptobox.com/*
// @match        *://*.mp4upload.com/*

// @license      GNU GPLv3
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_setStyle
// @run-at       document-start
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var link = null, anu = 0, tipe, jdl, aidi;
var str, atext, dlv, a, b ,c;
$(document).ready(function() {
    if(document.documentURI.match(/welcome.indihome.co.id/g)){
        link = getHref("div.background-box");
    } else if(document.documentURI.match(/oploverz.in\//g)){
        tipe = 'klik';
        if($("#close-stream-ads").length){ dlv = "Stream"; jdl = document.title; link = $("#close-stream-ads"); }
    } else if(document.documentURI.match(/kusonime.com\//g)){
        $("div.smokeurl").find("a").each(function() {
            if( $(this).attr("href").match(/kepoow.me/g) ) {
               str = atob( decodeURIComponent($(this).attr("href")).split("r=")[1] );
            }else str = decodeURIComponent($(this).attr("href")).split("url=")[1].split("&type")[0];
            $(this).attr("href", str);
        });
    // Url Shorter
    } else if(document.documentURI.match(/hexafile.net/g)){
        if(document.documentURI.match(/(v1|v3)\./g)){
            str = getBy("Tag","script")[18].text;
            link = (str.split('="')[1].split('",'))[0];
        } else if(document.documentURI.match(/v4\./g)){
            str = getBy("Tag","script")[19].text;
            link = (str.split('="')[1].split('",'))[0];
        } else {
            str = getBy("Tag","script")[6].text
            link = (str.split('window.location="')[1].split('";'))[0];
        }
    } else if(document.documentURI.match(/wahibirawan.com\//g)){
        tipe = 'klik';
        link = $("div#showlink");
    } else if(document.documentURI.match(/tetew.info|greget.space|siherp.com|ahexa.com/g)){
        link = getHref("div.download-link");
    } else if(document.documentURI.match(/anjay.info/g)){
        str = getBy("Tag","script")[4].text
        link = (str.split("changeLink(){var a='")[1].split("';"))[0];
    } else if(document.documentURI.match(/davinsurance.com\//g)){
        if(document.documentURI.match(/\?id=/g)){
            tipe='klik';
            link = $("input.sorasubmit");
        } else {
            str = getBy("Tag","script")[10].text
            link = (str.split("changeLink(){var a='")[1].split("';"))[0];
        }
    } else if(document.documentURI.match(/ngantukberat.me\//g)){
        if(document.documentURI.match(/\?go=/g)){
            tipe='klik';
            link = $("input.btn-primary");
        } else link = getHref("div#wpsafe-link");
    } else if(document.documentURI.match(/ljutkeunvpn.blogspot.com\/p\//g )){
        a = document.documentURI.split("url=")[1];
        link = atob(a).split("?")[1];
    // Situs Download
    }
    else if(document.documentURI.match(/zippyshare.com/g)){
        if($("a#dlbutton").length){ link = getHref("a#dlbutton"); }
        else alert("file dihapus?");
    } else if(document.documentURI.match(/drive.google.com/g)){
        if(document.documentURI.match(/\/uc\?/) || document.documentURI.match(/export/)){
            if( $("a#uc-download-link").length ){ link = $("a#uc-download-link").attr("href"); }
        } else {
            a = document.documentURI.replace("/file/d/", "/uc?id=");
            b = (a.split("/view")[0].split("/edit"))[0];
            link = b + "&export=download";
        }
    } else if(document.documentURI.match(/zxcfiles.com/g )){
        atext = $("span#download").text();
        if( atext == '' ){
            tipe = 'klik';
            link = $("button.downloadbtn");
        } else link = getHref("span#download");
    } else if(document.documentURI.match(/zxcfiles.xyz/g )){
            link = getHref("div.btn-group");
    } else if(document.documentURI.match(/mediafire.com\/file\//g )){
        link = getHref("div.download_link","a.input");
    } else if(document.documentURI.match(/elsfile.org\//g )){
        tipe = 'klik';
        if($("input#btn_download").length){
            jdl = getBy("Id","btn_download").value;
            link = $("input#btn_download");
        }
        else{
            aidi = document.documentURI.split("/")[3];
            $("#frmdlcenter").html(
                '<form method="POST">'+
                '<input type="hidden" name="op" value="download1">'+
                '<input type="hidden" name="usr_login" value="C">'+
                '<input type="hidden" name="id" value="'+ aidi +'">'+
                '<input type="hidden" name="referer" value="q">'+
                '<input type="submit" name="method_free" value="Free Download" style="background-color:#3f3f3f !important;color:#f1f1f1 !important;font-weight:bold !important;">'+
                '</form>'
            );
            jdl = getBy("Name","method_free")[0].value;
            link = $("input[name=method_free]");
        }
    } else if(document.documentURI.match(/clicknupload.org\//g )){
        if($("span.downloadbtn").length){
            tipe = 'klik';
            jdl = getBy("Class", "downloadbtn")[1].textContent;
            link = $("span.downloadbtn");
        } else if($("input[name=method_free]").length){
            tipe = 'klik';
            aidi = document.documentURI.split("/")[3];
            $("div#download").html(
                '<form method="POST" action="">' +
                '<input type="hidden" name="op" value="download1">' +
                '<input type="hidden" name="usr_login" value="">' +
                '<input type="hidden" name="id" value="'+ aidi +'">' +
                '<div class="regular"><i class="far fa-tachometer-alt-slow"></i> <input type="submit" id="method_free" name="method_free" value="Free Download >>"></div>' +
                '</form>'
            );
            jdl = getBy("Name","method_free")[0].value;
            link = $("input[name=method_free]");
        } else if($("div.download").find('downloadbtn').find('span').context.activeElement.innerText.length > 0){
            tipe = '';
            jdl = $("div.download").find('downloadbtn').find('span').context.activeElement.innerText
            link = $("button.downloadbtn").attr('onclick').replace("window.open('", "").replace("');" + '"', "");
        }
    } else if(document.documentURI.match(/racaty.com\//g )){
        atext = $("div.after").text();
        if( atext !== '' ){
            tipe = 'klik';
            link = $("div.after");
        } else {
            tipe = '';
            link = $("div#DIV_1.actions").find("a").attr("href");
        }
    } else if(document.documentURI.match(/letsupload.co\//g )){
        if($("div.download-timer").length){
            str = getBy("Tag","script")[18].text
            link = (str.split("btn-free' href='")[1].split("'>"))[0];
        }
        else if($("div.buttonsare").length){ link = getHref("div.buttonsare", "a[title=Download]"); }
    } else if(document.documentURI.match(/uptobox.com\//g )){
        if($("input.download-btn").length){
            tipe = 'klik';
            var a = $("input.download-btn").attr("class").replace("disabled", "enabled");
            $("input.download-btn").attr("class", a);
            jdl = $("input.download-btn").value;
            link = $("input.download-btn.big-button-green-flat.mt-4.mb-4.enabled");
        }
        else if($("a.big-button-green-flat.mt-4.mb-4").text().match(/start/)){
            jdl = $("a.big-button-green-flat.mt-4.mb-4").text();
            link = getHref("a.big-button-green-flat.mt-4.mb-4");
        }
    } else if(document.documentURI.match(/mp4upload.com\//g )){
        if($("span.btext").length){
            tipe = 'klik';
            link = $("span.btext");
        }
    }

    if(link!==null){
        setTimeout(function(){
            if(tipe == 'klik'){
                klik(link, jdl, dlv);
            } else if(tipe == 'sambit'){
                sambit(link, jdl);
            } else mangkat(link);
        }, (anu * 1000));
    }
});

function klik(url,tbl,tp="dl"){
    var jdul;
    if(url.click()){
        if(tp!=="dl"){ document.title = tbl; }
        else {
            if( url.text().length > 0 ){ jdul = url.text(); }
            else{ if(tbl!==""){ jdul = tbl }else jdul = url }
            document.title = 'Mencet Tombol "' + jdul + '"';
        }
    }else document.title = url;
}
function sambit(btn,tbl){
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
function getHref(tanda,prm=null){
    var fnd,hsl;
    if(tanda.match(/^a/)){ hsl = $(tanda).attr("href"); }
    else {
        if(prm!==null){ fnd = prm; }else fnd = "a";
        hsl = $(tanda).find(fnd).attr("href");
    }
    return hsl;
}
function getBy(by,prm){
    var gtb;
    if(by=="Tag"){ gtb = document.getElementsByTagName(prm); }
    else if(by=="Id"){ gtb = document.getElementById(prm); }
    else if(by=="Class"){ gtb = document.getElementsByClassName(prm); }
    else if(by=="Name"){ gtb = document.getElementsByName(prm); }
    return gtb;
}
