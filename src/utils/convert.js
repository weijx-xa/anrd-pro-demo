// export function convertDep(text, departmentList) {
//   const department = departmentList.filter(item => item.id === text)[0];
//   if (department) {
//     if (department.id < 7) {
//       return department.name;
//     }
//     const pdep = departmentList.filter(item => item.id === department.parentid)[0];
//     return `${pdep.name}-${department.name}`;
//   }
//   return '火星';
// }

export function depFullName(departmentId, departmentList, fullname = '') {
  const department = departmentList.filter(item => item.id === departmentId)[0];
  if (department) {
    const path = fullname === '' ? department.name : `${department.name};${fullname}`;
    if (department.parentid === 0) {
      return path;
    }
    return depFullName(department.parentid, departmentList, path);
  }
  return '火星';
}

export function depName(departmentId, departmentList) {
  const department = departmentList.filter(item => item.id === departmentId)[0];
  if (department) {
    return department.name;
  }
  return '火星';
}

export function convertMtype(text, mtypeList) {
  const mtype = mtypeList.filter(item => item.id === text)[0];
  if (mtype) return `${mtype.Class}-${mtype.Name}-${mtype.mSize}`;
  return '未知材料';
}

export function optionsMtype(mtypeList) {
  const options = [];
  mtypeList.forEach(item => {
    // 是否存在一级
    const result = options.findIndex(value => value.label === item.Class);
    const children = { value: item.id, label: item.Name };
    if (result !== -1) {
      options[result].children.push(children);
    } else {
      options.push({ value: item.id, label: item.Class, children: [children] });
    }
  });
  return options;
}

// var map = arr.reduce((map, el) => map.set(el.id, el), new Map())
// var newArr
// arr.forEach(el => {
//   let {relation, peiou, peiouArr} = el
//   if (map.has(peiou)) { peiouArr.push(map.get(peiou)) }
//   if (relation === -10) { newArr = el }
//   else if (map.has(relation)) { map.get(relation).child.push(el) }
// })
// console.log(newArr)

export function depToTree(data, parentid = 0) {
  const tree = [];
  let temp = null;
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].parentid === parentid) {
      const obj = { key: data[i].id, value: data[i].id, label: data[i].name };
      temp = depToTree(data, data[i].id);
      if (temp.length > 0) {
        obj.children = temp;
      }
      tree.push(obj);
    }
  }
  return tree;
}

export function toTime(date) {
  const str = date.replace(/ /g, 'T');
  return new Date(str).getTime();
}

export function vilidate(value) {
  return Number.isInteger(Number(value)) && value >= 0 && value < 99999999;
}
