const getAge = (birthDate) =>
  Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

getAge("1993-09-24");
getAge("1994-06-13");
