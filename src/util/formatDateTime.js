export default timestamp => {
  if (timestamp) {
    const timeString = new Date(timestamp);
    const [date, month, time] = [
      timeString.getDate(),
      timeString.getMonth() + 1,
      timeString.getHours()
    ];
    const finalTime = `${date}/${month}(${time}:00)`;
    return finalTime;
  }
};
