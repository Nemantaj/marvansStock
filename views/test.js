const date = [
  {
    date: "2022-10-16T00:00:00.000Z",
    name: "asdad",
    prod: [{ data: "dasdas" }],
  },
  {
    date: "2022-10-16T00:00:00.000Z",
    name: "asdad",
    prod: [{ data: "dasdas" }],
  },
  {
    date: "2023-10-16T00:00:00.000Z",
    name: "asdad",
    prod: [{ data: "dasdas" }],
  },
];
let value = "2002";
const pattern = /2022/;
const isTrue = date.filter((doc) => {
  return (
    doc.date.includes("2022") ||
    doc.name.includes("2022") ||
    doc.prod.some((id) => id.data.includes("2022"))
  );
});

console.log(isTrue);
