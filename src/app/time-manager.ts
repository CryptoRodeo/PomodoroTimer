class TimeManager {
  private __timePeriodSelected = null;
  private __countDownValue = null;

  constructor(timePeriodSelected){
    this.__timePeriodSelected = timePeriodSelected;
    this.__countDownValue = this.convertToSeconds(timePeriodSelected);
  }

  get timePeriod(): number {
    return this.__timePeriodSelected;
  }

  get countDownValue(): number {
    return this.__countDownValue;
  }

  set countDownValue(val) {
    this.__countDownValue = val;
  }

  countDown(): void {
    console.log(`From the time manager ${this.countDownValue}`);
    this.countDownValue = this.countDownValue - 1;
  }

  resetCountDownValue() {
    this.__countDownValue = this.convertToSeconds(this.__timePeriodSelected);
  }

  setTimePeriod = (minutes: number): void => {
    this.__timePeriodSelected = minutes;
    this.__countDownValue = this.convertToSeconds(minutes);
  }

  convertToSeconds = (minutes: number): number => {
    return (minutes * 60);
  }

  formatTime = (): string => {
    const time = new Date(this.countDownValue * 1000);

    /**
     * Get minutes and seconds, add padding.
     */
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    return `${minutes} : ${seconds}`;
  }
};
export { TimeManager }
