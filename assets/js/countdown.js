function getNextThursday() {
    let now = moment();
    let nextThursday = moment().day(4).hour(12).minute(0).second(0); // Set to Thursday 12:00 PM

    if (now.isAfter(nextThursday)) {
        nextThursday.add(1, 'weeks');
    }

    return nextThursday;
}

function updateCountdown(timezone) {
    let nextThursday = getNextThursday().tz(timezone);
    let now = moment().tz(timezone);

    let duration = moment.duration(nextThursday.diff(now));

    let days = Math.floor(duration.asDays());
    let hours = duration.hours();
    let minutes = duration.minutes();
    let seconds = duration.seconds();

    $('#countdown').text(`${days}d ${hours}h ${minutes}m ${seconds}s`);
}

$(document).ready(function () {
    let defaultTimezone = 'Europe/Zagreb';

    updateCountdown(defaultTimezone);
    setInterval(function () {
        let timezone = $('#timezoneSelect').val();
        updateCountdown(timezone);
    }, 1000);

    $('#timezoneSelect').change(function () {
        let timezone = $(this).val();
        updateCountdown(timezone);
    });
});
