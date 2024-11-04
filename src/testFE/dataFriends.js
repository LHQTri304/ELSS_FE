let num = 200;
const randomImg = () => {
  num++;
  return 'https://picsum.photos/' + num.toString();
};
export default dataFriends = [
  {
    ID: 1,
    fulName: 'Nguyen Van A',
    image: randomImg(),
    userName: 'nguyenvana123',
  },
  {
    ID: 2,
    fulName: 'Le Thi B',
    image: randomImg(),
    userName: 'lethib234',
  },
];
