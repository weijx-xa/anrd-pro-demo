import mtype from './geographic/mtype';
// import province from './geographic/province.json';

function getMtype(req, res) {
  return res.json(mtype);
}

export default {
  'POST /basic/get_mtype': getMtype,
};
