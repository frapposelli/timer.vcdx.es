// vcdxtimer.js - fabio@rapposelli.org - https://github.com/frapposelli

Array.prototype.next = function() {
    if (!((this.current + 1) in this)) {
        this.current = 0;
        return this[this.current];
    }
    return this[++this.current];
};
Array.prototype.current = 0;
var currentScenario = 0;

function BlockMove(a) {
    a.preventDefault();
}

function timerLoad(a) {
    window.scrollTo(0, 1);
    document.getElementById("sessionTitle").innerHTML = this[a][2];
    document.getElementById("certTitle").innerHTML = this[a][1];
    $("#theTime").countdown("destroy");
    $("#theTime").removeClass("highlight");
    $("#theTime").countdown({
        until: this[a][0],
        format: "Ms",
        layout: '<span class="digit">{m10}</span><span class="digit">{m1}</span><span class="separator">{sep}</span><span class="digit">{s10}</span><span class="digit">{s1}</span>',
        onTick: highlightLast5
    });
    $("#theTime").countdown("pause");
    currentScenario = a;
}

function Carousel() {
    var a = VCDXScenarios.next();
    timerLoad(a);
}

function notify() {
    var a = document.getElementById("notification");
    a.play();
}

function endSound() {
    var a = document.getElementById("endsound");
    a.play();
}

function highlightLast5(a) {
    if ($.countdown.periodsToSeconds(a) == 300) {
        $(this).addClass("highlight");
        notify();
    }
    if ($.countdown.periodsToSeconds(a) == 290) {
        $(this).removeClass("highlight");
    }
    if ($.countdown.periodsToSeconds(a) == 180) {
        $(this).addClass("highlight");
        notify();
    }
    if ($.countdown.periodsToSeconds(a) == 170) {
        $(this).removeClass("highlight");
    }
    if ($.countdown.periodsToSeconds(a) == 60) {
        $(this).addClass("highlight");
        notify();
    }
    if ($.countdown.periodsToSeconds(a) === 0) {
        endSound();
    }
}
