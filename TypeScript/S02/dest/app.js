console.log('hello World');
class LMSCalendar {
    constructor(events) {
        this.events = events;
    }
    addEvents(event) {
        this.events.push(event);
    }
}
const de07 = new LMSCalendar(['HTML', 'JS', 'React']);
de07.events.push('TS');
console.log(de07);
const de08 = new LMSCalendar(['HTML', 'JS', 'VueJS']);
console.log(de08);
