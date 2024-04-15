import { format, getDay, isSaturday } from "date-fns";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));

const today = new Date();
const targetYear = args.y ?? today.getFullYear();
const targetMonth = args.m ?? today.getMonth() + 1;
const startDate = new Date(targetYear, targetMonth - 1, 1);

const targetMonthName = format(startDate, "MMMM");

console.log(`     ${targetMonthName} ${targetYear}`);
console.log("Su Mo Tu We Th Fr Sa");

let weekColumnText = "   ".repeat(getDay(startDate));

const endDate = new Date(targetYear, targetMonth, 0);

for (
  let date = new Date(startDate);
  date <= endDate;
  date.setDate(date.getDate() + 1)
) {
  let day = date.getDate();

  if (day.toString().length < 2) {
    weekColumnText += " ";
  }

  weekColumnText += `${day}${isSaturday(date) ? "" : " "}`;

  if (isSaturday(date) || date.getDate() === endDate.getDate()) {
    console.log(weekColumnText);
    weekColumnText = "";
  }
}
