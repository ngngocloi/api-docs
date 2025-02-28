const axios = require('axios');

const config = {
  name: "bienso",
  version: "1.0.0",
  hasPermission: 0,
  credits: "L.V. Bằng",
  description: "",
  commandCategory: "THÔNG TIN",
  usages: "[text]",
  cooldowns: 0
};

async function phatNguoi({ args }) {
  const headers = {
    'content-type': 'application/json',
    'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
    'x-firebase-appcheck': 'eyJlcnJvciI6IlVOS05PV05fRVJST1IifQ=='
  };

  const formData = {
    data: {
      BienKS: `${args[0]}`,
      Xe: `${args[1]}`
    }
  };

  try {
    const { data } = await axios.post('https://asia-east2-viphamgiaothong2019.cloudfunctions.net/national', formData, { headers });
    return data;
  } catch (err) {
    return err.message;
  }
}

function layBKS(province) {
  const provinceMap = {
    'cao bằng': {
      licensePlate: '11',
      description: '\n->Mã Vùng:0206\n->Khu vực:Đông Bắc Bộ\n->Dân số:530.341\n->Diện tích:6.700,30\n'
    },
     'lạng sơn': {
      licensePlate: '12',
      description: '\n->Mã Vùng:0205\n->Khu vực:Đông Bắc Bộ\n->Dân số:781.655\n->Diện tích:8.310,20\n'
    },
    'quảng ninh': {
      licensePlate: '14',
      description: '\n->Mã Vùng:0203\n->Khu vực:Đông Bắc Bộ\n->Dân số:1.320.324\n->Diện tích:	6.177,70\n'
    },
    'hải phòng': {
      licensePlate: '15',
      description: '\n->Mã Vùng:0225\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:2.028.514\n->Diện tích:1.522,50\n'
    },
     'hải phòng': {
      licensePlate: '16',
      description: '\n->Mã Vùng:0225\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:2.028.514\n->Diện tích:1.522,50\n'
    },
     'thái bình': {
      licensePlate: '17',
      description: '\n->Mã Vùng:0227\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:1.860.447\n->Diện tích:1.570,50\n'
    },
      'nam định': {
      licensePlate: '18',
      description: '\n->Mã Vùng:0228\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:1.780.393\n->Diện tích:1.668\n'
    },
      'phú thọ': {
      licensePlate: '19',
      description: '\n->Mã Vùng:0210\n->Khu vực:Đông Bắc Bộ\n->Dân số:1.463.726\n->Diện tích:3.534,60\n'
    },
      'thái nghuyên': {
      licensePlate: '20',
      description: '\n->Mã Vùng:0208\n->Khu vực:Đông Bắc Bộ\n->Dân số:1.286.751\n->Diện tích:3.536,40\n'
    },
      'yên bái': {
      licensePlate: '21',
      description: '\n->Mã Vùng:0216\n->Khu vực:Tây Bắc Bộ\n->Dân số:821.030\n->Diện tích:6.887,70\n'
    },
    'tuyên quang': {
      licensePlate: '22',
      description: '\n->Mã Vùng:0207\n->Khu vực:Đông Bắc Bộ\n->Dân số:784.811\n->Diện tích:5.867,90\n'
    },
    'hà giang': {
      licensePlate: '23',
      description: '\n->Mã Vùng:0219\n->Khu vực:Đông Bắc Bộ\n->Dân số:854.679\n->Diện tích:7.929,50\n'
    },
    'lào cai': {
      licensePlate: '24',
      description: '\n->Mã Vùng:0214\n->Khu vực:Tây Bắc Bộ\n->Dân số:730.420\n->Diện tích:6.364\n'
    },
    'lai châu': {
      licensePlate: '25',
      description: '\n->Mã Vùng:0213\n->Khu vực:Tây Bắc Bộ\n->Dân số:460.196\n->Diện tích:9.068,80\n'
    },
    'sơn la': {
      licensePlate: '26',
      description: '\n->Mã Vùng:0212\n->Khu vực:Tây Bắc Bộ\n->Dân số:1.248.415\n->Diện tích:14.123,50\n'
    },
    'điện biên': {
      licensePlate: '27',
      description: '\n->Mã Vùng:0215\n->Khu vực:Tây Bắc Bộ\n->Dân số:598.856\n->Diện tích:9.541\n'
    },
    'hòa bình': {
      licensePlate: '28',
      description: '\n->Mã Vùng:0218\n->Khu vực:Tây Bắc Bộ\n->Dân số:854.131\n->Diện tích:4.591\n'
    },
    'hà nội': {
      licensePlate: '29',
      description: '\n->Mã Vùng:024\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:8.053.663\n->Diện tích:3.358,90\n'
    },
    'hà nội': {
      licensePlate: '33',
      description: '\n->Mã Vùng:024\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:8.053.663\n->Diện tích:3.358,90\n'
    },
    'hà nội': {
      licensePlate: '40',
      description: '\n->Mã Vùng:024\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:8.053.663\n->Diện tích:3.358,90\n'
    },
    'hải dương': {
      licensePlate: '34',
      description: '\n->Mã Vùng:0220\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:1.892.254\n->Diện tích:1.668,20\n'
    },
    'ninh bình': {
      licensePlate: '35',
      description: '\n->Mã Vùng:0229\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:982.487\n->Diện tích:1.387\n'
    },
    'thanh hóa': {
      licensePlate: '36',
      description: '\n->Mã Vùng:0237\n->Khu vực:Bắc Trung Bộ\n->Dân số:3.640.128\n->Diện tích:11.114,70\n'
    },
    'nghệ an': {
      licensePlate: '37',
      description: '\n->Mã Vùng:0238\n->Khu vực:Bắc Trung Bộ\n->Dân số:3.327.791\n->Diện tích:16.493,70\n'
    },
    'hà tĩnh': {
      licensePlate: '38',
      description: '\n->Mã Vùng:0239\n->Khu vực:Bắc Trung Bộ\n->Dân số:1.288.866\n->Diện tích:5.990,70\n'
    },
    'đồng nai': {
      licensePlate: '39',
      description: '\n->Mã Vùng:0251\n->Khu vực:Đông Nam Bộ\n->Dân số:3.097.107\n->Diện tích:5.905,70\n'
    },
    'đồng nai': {
      licensePlate: '60',
      description: '\n->Mã Vùng:0251\n->Khu vực:Đông Nam Bộ\n->Dân số:3.097.107\n->Diện tích:5.905,70\n'
    },
    'đà nẵng': {
      licensePlate: '43',
      description: '\n->Mã Vùng:0236\n->Khu vực:Duyên hải Nam Trung Bộ\n->Dân số:1.134.310\n->Diện tích:	1.284,90\n'
    },
    'đắk lắk': {
      licensePlate: '47',
      description: '\n->Mã Vùng:0262\n->Khu vực:Tây Nguyên\n->Dân số:1.869.322\n->Diện tích:13.030,50\n'
    },
    'đắk nông': {
      licensePlate: '48',
      description: '\n->Mã Vùng:0261\n->Khu vực:Tây Nguyên\n->Dân số:622.168\n->Diện tích:6.509,30\n'
    },
    'lâm đồng': {
      licensePlate: '49',
      description: '\n->Mã Vùng:0263\n->Khu vực:Tây Nguyên\n->Dân số:1.296.606\n->Diện tích:9.783,20\n'
    },
    'thành phố hồ chí minh': {
      licensePlate: '50',
      description: '\n->Mã Vùng:028\n->Khu vực:Đông Nam Bộ\n->Dân số:8.993.082\n->Diện tích:2.061\n'
    },
    'thành phố hồ chí minh': {
      licensePlate: '59',
         description: '\n->Mã Vùng:028\n->Khu vực:Đông Nam Bộ\n->Dân số:8.993.082\n->Diện tích:2.061\n'
    },
    'thành phố hồ chí minh': {
      licensePlate: '41',
      description: '\n->Mã Vùng:028\n->Khu vực:Đông Nam Bộ\n->Dân số:8.993.082\n->Diện tích:2.061\n'
    },
    'bình dương': {
      licensePlate: '61',
      description: '\n->Mã Vùng:0220\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:1.892.254\n->Diện tích:1.668,20\n'
    },
    'long an': {
      licensePlate: '62',
      description: '\n->Mã Vùng:0272\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.688.547\n->Diện tích:4.490,20\n'
    },
    'tiền giang': {
      licensePlate: '63',
      description: '\n->Mã Vùng:0273\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.764.185\n->Diện tích:	2.510,50\n'
    },
    'vĩnh long': {
      licensePlate: '64',
      description: '\n->Mã Vùng:0270\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.022.791\n->Diện tích:1.475\n'
    },
    'cần thơ': {
      licensePlate: '65',
      description: '\n->Mã Vùng:0292\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.235.171\n->Diện tích:1.439,20\n'
    },
    'đồng tháp': {
      licensePlate: '66',
      description: '\n->Mã Vùng:0277\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.599.504\n->Diện tích:3.383,80\n'
    },
    'an giang': {
      licensePlate: '67',
      description: '\n->Mã Vùng:0296\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.908.352\n->Diện tích:3.536,70\n'
    },
    'kiên giang': {
      licensePlate: '68',
      description: '\n->Mã Vùng:0297\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.723.067\n->Diện tích:6.348,80\n'
    },
    'cà mau': {
      licensePlate: '69',
      description: '\n->Mã Vùng:0290\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.194.476\n->Diện tích:	5.294,80\n'
    },
    'tây ninh': {
      licensePlate: '70',
      description: '\n->Mã Vùng:0276\n->Khu vực:Đông Nam Bộ\n->Dân số:1.169.165\n->Diện tích:4.041,40\n'
    },
    'bến tre': {
      licensePlate: '71',
      description: '\n->Mã Vùng:0275\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.288.463\n->Diện tích:2.394,60\n'
    },
    'bà rịa vũng tàu': {
      licensePlate: '72',
      description: '\n->Mã Vùng:0254\n->Khu vực:Đông Nam Bộ\n->Dân số:1.148.313\n->Diện tích:1.980,80\n'
    },
    'quảng bình': {
      licensePlate: '73',
      description: '\n->Mã Vùng:0232\n->Khu vực:Bắc Trung Bộ\n->Dân số:895.430\n->Diện tích:8.065,30\n'
    },
    'quảng trị': {
      licensePlate: '74',
      description: '\n->Mã Vùng:0233\n->Khu vực:Bắc Trung Bộ\n->Dân số:632.375\n->Diện tích:4.739,80\n'
    },
    'huế': {
      licensePlate: '75',
      description: '\n->Mã Vùng:023\n->Khu vực:Bắc Trung Bộ\n->Dân số:1.128.620\n->Diện tích:5.048,20\n'
    },
    'quảng ngãi': {
      licensePlate: '76',
      description: '\n->Mã Vùng:0255\n->Khu vực:Duyên hải Nam Trung Bộ\n->Dân số:1.231.697\n->Diện tích:5.135,20\n'
    },
    'bình định': {
      licensePlate: '77',
      description: '\n->Mã Vùng:0256\n->Khu vực:Duyên hải Nam Trung Bộ\n->Dân số:1.486.918\n->Diện tích:6.066,20\n'
    },
    'phú yên': {
      licensePlate: '78',
      description: '\n->Mã Vùng:0257\n->Khu vực:Duyên hải Nam Trung Bộ\n->Dân số:961.152\n->Diện tích:5.023,40\n'
    },
    'khánh hòa': {
      licensePlate: '79',
      description: '\n->Mã Vùng: 0258\n->Khu vực:Duyên hải Nam Trung Bộ\n->Dân số:1.231.107\n->Diện tích:5.137,80\n'
    },
    'cơ quang tw': {
      licensePlate: '80',
      description: '\n->Ban Chấp hành Trung ương Đảng Cộng sản Việt Nam'
    },
    'gia lai': {
      licensePlate: '81',
      description: '\n->Mã Vùng: 0269\n->Khu vực:Tây Nguyên\n->Dân số:1.513.847\n->Diện tích:15.510,80\n'
    },
    'kon tum': {
      licensePlate: '82',
      description: '\n->Mã Vùng:0260\n->Khu vực:Tây Nguyên\n->Dân số:540.438\n->Diện tích:9.674,20\n'
    },
    'sóc trăng': {
      licensePlate: '83',
      description: '\n->Mã Vùng:0299\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.199.653\n->Diện tích:3.311,80\n'
    },
    'trà vinh': {
      licensePlate: '84',
      description: '\n->Mã Vùng:0294\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.009.168\n->Diện tích:2.358,20\n'
    },
    'ninh thuận': {
      licensePlate: '85',
      description: '\n->Mã Vùng:0259\n->Khu vực:Duyên hải Nam Trung Bộ\n->Dân số:590.467\n->Diện tích:3.355,30\n'
    },
    'bình thuận': {
      licensePlate: '86',
      description: '\n->Mã Vùng:0252\n->Khu vực:Duyên hải Nam Trung Bộ\n->Dân số:1.230.808\n->Diện tích:7.812,80\n'
    },
    'vĩnh phúc': {
      licensePlate: '88',
      description: '\n->Mã Vùng:0211\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:1.154.154\n->Diện tích:1.235,20\n'
    },
    'hưng yên': {
      licensePlate: '89',
      description: '\n->Mã Vùng:0221\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:1.252.731\n->Diện tích:930,2\n'
    },
    'hà nam': {
      licensePlate: '90',
      description: '\n->Mã Vùng:0226\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:852.800\n->Diện tích:860,9\n'
    },
    'quảng nam': {
      licensePlate: '92',
      description: '\n->Mã Vùng:0235\n->Khu vực:Duyên hải Nam Trung Bộ\n->Dân số:1.495.812\n->Diện tích:10.574,70\n'
    },
    'bình phước': {
      licensePlate: '93',
      description: '\n->Mã Vùng:0271\n->Khu vực:Đông Nam Bộ\n->Dân số:994.679\n->Diện tích:6.877\n'
    },
    'bạc liêu': {
      licensePlate: '94',
      description: '\n->Mã Vùng:0291\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:907.236\n->Diện tích:2.669\n'
    },
    'hậu giang': {
      licensePlate: '95',
      description: '\n->Mã Vùng:0293\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:733.017\n->Diện tích:1.621,80\n'
    },
    'bắc kạn': {
      licensePlate: '97',
      description: '\n->Mã Vùng:0209\n->Khu vực:Đông Bắc Bộ\n->Dân số:313.905\n->Diện tích:4.860\n'
    },
    'bắc giang': {
      licensePlate: '13',
      description: '\n->Mã Vùng:0204\n->Khu vực:Đông Bắc Bộ\n->Dân số:1.803.950\n->Diện tích:3.851,40\n'
    },
    'bắc giang': {
      licensePlate: '98',
       description: '\n->Mã Vùng:0204\n->Khu vực:Đông Bắc Bộ\n->Dân số:1.803.950\n->Diện tích:3.851,40\n'
    },
    'bắc ninh': {
      licensePlate: '99',
      description: '\n->Mã Vùng:0222\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:1.368.840\n->Diện tích:822,7\n'
    },
    // Thêm tương tự
  };

  const licensePlate = provinceMap[province.toLowerCase().trim()];
  return licensePlate || 'Không tìm thấy biển số';
}

function layTenTinh(bienks) {
  const provinceMap = {
     '11': {
      name: 'Cao Bằng',
      description: '\n->Mã Vùng:0206\n->Khu vực:Đông Bắc Bộ\n->Dân số:530.341\n->Diện tích:6.700,30\n'
    },
     '12': {
      name: '	Lạng Sơn',
      description: '\n->Mã Vùng:0205\n->Khu vực:Đông Bắc Bộ\n->Dân số:781.655\n->Diện tích:8.310,20\n'
    },
     '14': {
      name: 'Quảng Ninh',
      description: '\n->Mã Vùng:0203\n->Khu vực:Đông Bắc Bộ\n->Dân số:1.320.324\n->Diện tích:	6.177,70\n'
    },
     '15': {
      name: 'Hải Phòng',
      description: '\n->Mã Vùng:0225\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:2.028.514\n->Diện tích:1.522,50\n'
    },
     '17': {
      name: 'Thái Bình',
    description: '\n->Mã Vùng:0227\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:1.860.447\n->Diện tích:1.570,50\n'
    },
     '18': {
      name: 'Nam Định',
       description: '\n->Mã Vùng:0228\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:1.780.393\n->Diện tích:1.668\n'
    },
     '19': {
      name: 'Phú Thọ',
      description: '\n->Mã Vùng:0210\n->Khu vực:Đông Bắc Bộ\n->Dân số:1.463.726\n->Diện tích:3.534,60\n'
    },
     '20': {
      name: 'Thái Nguyên',
    description: '\n->Mã Vùng:0208\n->Khu vực:Đông Bắc Bộ\n->Dân số:1.286.751\n->Diện tích:3.536,40\n'
    },
     '21': {
      name: 'Yên Bái',
      description: '\n->Mã Vùng:0216\n->Khu vực:Tây Bắc Bộ\n->Dân số:821.030\n->Diện tích:6.887,70\n'
    },
     '22': {
      name: 'Tuyên Quang',
       description: '\n->Mã Vùng:0207\n->Khu vực:Đông Bắc Bộ\n->Dân số:784.811\n->Diện tích:5.867,90\n'
    },
     '23': {
      name: 'Hà Giang',
      description: '\n->Mã Vùng:0219\n->Khu vực:Đông Bắc Bộ\n->Dân số:854.679\n->Diện tích:7.929,50\n'
    },
     '24': {
      name: '	Lào Cai',
      description: '\n->Mã Vùng:0214\n->Khu vực:Tây Bắc Bộ\n->Dân số:730.420\n->Diện tích:6.364\n'
    },
     '25': {
      name: 'Lai Châu',
      description: '\n->Mã Vùng:0213\n->Khu vực:Tây Bắc Bộ\n->Dân số:460.196\n->Diện tích:9.068,80\n'
    },
     '26': {
      name: 'Sơn La',
     description: '\n->Mã Vùng:0212\n->Khu vực:Tây Bắc Bộ\n->Dân số:1.248.415\n->Diện tích:14.123,50\n'
    },
     '27': {
      name: 'Điện Biên',
     description: '\n->Mã Vùng:0215\n->Khu vực:Tây Bắc Bộ\n->Dân số:598.856\n->Diện tích:9.541\n'
    },
     '28': {
      name: 'Hòa Bình',
      description: '\n->Mã Vùng:0218\n->Khu vực:Tây Bắc Bộ\n->Dân số:854.131\n->Diện tích:4.591\n'
    },
     '29': {
      name: 'Hà Nội',
     description: '\n->Mã Vùng:024\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:8.053.663\n->Diện tích:3.358,90\n'
    },
     '34': {
      name: 'Hải Dương',
     description: '\n->Mã Vùng:0220\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:1.892.254\n->Diện tích:1.668,20\n'
    },
     '35': {
      name: 'Ninh Bình',
     description: '\n->Mã Vùng:0229\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:982.487\n->Diện tích:1.387\n'
    },
     '36': {
      name: 'Thanh Hóa',
    description: '\n->Mã Vùng:0237\n->Khu vực:Bắc Trung Bộ\n->Dân số:3.640.128\n->Diện tích:11.114,70\n'
    },
     '37': {
      name: 'Nghệ An ',
      description: '\n->Mã Vùng:0238\n->Khu vực:Bắc Trung Bộ\n->Dân số:3.327.791\n->Diện tích:16.493,70\n'
    },
     '38': {
      name: 'Hà Tĩnh',
      description: '\n->Mã Vùng:0239\n->Khu vực:Bắc Trung Bộ\n->Dân số:1.288.866\n->Diện tích:5.990,70\n'
    },
     '39': {
      name: 'Đồng Nai',
       description: '\n->Mã Vùng:0251\n->Khu vực:Đông Nam Bộ\n->Dân số:3.097.107\n->Diện tích:5.905,70\n'
    },
     '60': {
      name: 'Đồng Nai',
      description: '\n->Mã Vùng:0251\n->Khu vực:Đông Nam Bộ\n->Dân số:3.097.107\n->Diện tích:5.905,70\n'
    },
     '43': {
      name: 'Đà Nẵng',
       description: '\n->Mã Vùng:0236\n->Khu vực:Duyên hải Nam Trung Bộ\n->Dân số:1.134.310\n->Diện tích:	1.284,90\n'
    },
     '47': {
      name: 'Đắk Lắk',
       description: '\n->Mã Vùng:0262\n->Khu vực:Tây Nguyên\n->Dân số:1.869.322\n->Diện tích:13.030,50\n'
    },
     '48': {
      name: 'Đắk Nông',
      description: '\n->Mã Vùng:0261\n->Khu vực:Tây Nguyên\n->Dân số:622.168\n->Diện tích:6.509,30\n'
    },
     '49': {
      name: 'Lâm Đồng',
     description: '\n->Mã Vùng:0263\n->Khu vực:Tây Nguyên\n->Dân số:1.296.606\n->Diện tích:9.783,20\n'
    },
     '50': {
      name: 'TP.HCM',
        description: '\n->Mã Vùng:028\n->Khu vực:Đông Nam Bộ\n->Dân số:8.993.082\n->Diện tích:2.061\n'
    },
     '59': {
      name: 'TP.HCM',
       description: '\n->Mã Vùng:028\n->Khu vực:Đông Nam Bộ\n->Dân số:8.993.082\n->Diện tích:2.061\n'
    },
     '41': {
      name: 'TP.HCM',
       description: '\n->Mã Vùng:028\n->Khu vực:Đông Nam Bộ\n->Dân số:8.993.082\n->Diện tích:2.061\n'
    }, 
    '61': {
      name: 'Bình Dương',
        description: '\n->Mã Vùng:0220\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:1.892.254\n->Diện tích:1.668,20\n'
    },
    '62': {
      name: 'Long An ',
    description: '\n->Mã Vùng:0272\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.688.547\n->Diện tích:4.490,20\n'
    },
     '63': {
      name: 'Tiền Giang',
       description: '\n->Mã Vùng:0273\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.764.185\n->Diện tích:	2.510,50\n'
    },
     '64': {
      name: 'Vĩnh Long',
     description: '\n->Mã Vùng:0270\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.022.791\n->Diện tích:1.475\n'
    },
     '65': {
      name: 'Cần Thơ',
      description: '\n->Mã Vùng:0292\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.235.171\n->Diện tích:1.439,20\n'
    },
    '66': {
      name: 'Đồng Tháp',
      description: '\n->Mã Vùng:0277\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.599.504\n->Diện tích:3.383,80\n'
    },
     '67': {
      name: 'An Giang',
     description: '\n->Mã Vùng:0296\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.908.352\n->Diện tích:3.536,70\n'
    },
     '68': {
      name: 'Kiên Giang',
      description: '\n->Mã Vùng:0297\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.723.067\n->Diện tích:6.348,80\n'
    },
     '69': {
      name: '	Cà Mau',
     description: '\n->Mã Vùng:0290\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.194.476\n->Diện tích:	5.294,80\n'
    }, 
    '70': {
      name: 'Tây Ninh',
       description: '\n->Mã Vùng:0276\n->Khu vực:Đông Nam Bộ\n->Dân số:1.169.165\n->Diện tích:4.041,40\n'
    },
     '71': {
      name: 'Bến Tre',
    description: '\n->Mã Vùng:0275\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.288.463\n->Diện tích:2.394,60\n'
    },
     '72': {
      name: 'BR. Vũng Tàu',
      description: '\n->Mã Vùng:0254\n->Khu vực:Đông Nam Bộ\n->Dân số:1.148.313\n->Diện tích:1.980,80\n'
    },
     '73': {
      name: 'Quảng Bình',
     description: '\n->Mã Vùng:0232\n->Khu vực:Bắc Trung Bộ\n->Dân số:895.430\n->Diện tích:8.065,30\n'
    }, 
    '74': {
      name: 'Quảng Trị',
      description: '\n->Mã Vùng:0233\n->Khu vực:Bắc Trung Bộ\n->Dân số:632.375\n->Diện tích:4.739,80\n'
    },
     '75': {
      name: 'Huế',
   description: '\n->Mã Vùng:023\n->Khu vực:Bắc Trung Bộ\n->Dân số:1.128.620\n->Diện tích:5.048,20\n'
    },
     '76': {
      name: 'Quảng Ngãi',
       description: '\n->Mã Vùng:0255\n->Khu vực:Duyên hải Nam Trung Bộ\n->Dân số:1.231.697\n->Diện tích:5.135,20\n'
    },
     '77': {
      name: 'Bình Định',
     description: '\n->Mã Vùng:0256\n->Khu vực:Duyên hải Nam Trung Bộ\n->Dân số:1.486.918\n->Diện tích:6.066,20\n'
    },
     '78': {
      name: 'Phú Yên',
       description: '\n->Mã Vùng:0257\n->Khu vực:Duyên hải Nam Trung Bộ\n->Dân số:961.152\n->Diện tích:5.023,40\n'
    },
    '79': {
      name: 'Khánh Hòa',
      description: '\n->Mã Vùng: 0258\n->Khu vực:Duyên hải Nam Trung Bộ\n->Dân số:1.231.107\n->Diện tích:5.137,80\n'
    },
    '80': {
      name: 'Cơ quan TW *',
    description: '\n->Ban Chấp hành Trung ương Đảng Cộng sản Việt Nam'
    },
    '81': {
      name: 'Gia Lai',
       description: '\n->Mã Vùng: 0269\n->Khu vực:Tây Nguyên\n->Dân số:1.513.847\n->Diện tích:15.510,80\n'
    },
    '82': {
      name: 'Kon Tum',
     description: '\n->Mã Vùng:0260\n->Khu vực:Tây Nguyên\n->Dân số:540.438\n->Diện tích:9.674,20\n'
    },
    '83': {
      name: 'Sóc Trăng',
       description: '\n->Mã Vùng:0299\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.199.653\n->Diện tích:3.311,80\n'
    },
    '84': {
      name: 'Trà Vinh',
     description: '\n->Mã Vùng:0294\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:1.009.168\n->Diện tích:2.358,20\n'
    },
    '85': {
      name: 'Ninh Thuận',
       description: '\n->Mã Vùng:0259\n->Khu vực:Duyên hải Nam Trung Bộ\n->Dân số:590.467\n->Diện tích:3.355,30\n'
    },
    '86': {
      name: 'Bình Thuận',
      description: '\n->Mã Vùng:0252\n->Khu vực:Duyên hải Nam Trung Bộ\n->Dân số:1.230.808\n->Diện tích:7.812,80\n'
    },
    '88': {
      name: 'Vĩnh Phúc',
      description: '\n->Mã Vùng:0211\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:1.154.154\n->Diện tích:1.235,20\n'
    },
    '89': {
      name: 'Hưng Yên',
       description: '\n->Mã Vùng:0221\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:1.252.731\n->Diện tích:930,2\n'
    },
    '90': {
      name: 'Hà Nam',
        description: '\n->Mã Vùng:0226\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:852.800\n->Diện tích:860,9\n'
    },
    '92': {
      name: 'Quảng Nam',
      description: '\n->Mã Vùng:0235\n->Khu vực:Duyên hải Nam Trung Bộ\n->Dân số:1.495.812\n->Diện tích:10.574,70\n'
    },
    '93': {
      name: 'Bình Phước',
        description: '\n->Mã Vùng:0271\n->Khu vực:Đông Nam Bộ\n->Dân số:994.679\n->Diện tích:6.877\n'
    },
    '94': {
      name: 'Bạc Liêu',
      description: '\n->Mã Vùng:0291\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:907.236\n->Diện tích:2.669\n'
    },
    '95': {
      name: 'Hậu Giang',
      description: '\n->Mã Vùng:0293\n->Khu vực:Đồng bằng sông Cửu Long\n->Dân số:733.017\n->Diện tích:1.621,80\n'
    },
    '97': {
      name: 'Bắc Kạn',
    description: '\n->Mã Vùng:0209\n->Khu vực:Đông Bắc Bộ\n->Dân số:313.905\n->Diện tích:4.860\n'
    },
    '13': {
      name: 'Bắc Giang',
    description: '\n->Mã Vùng:0204\n->Khu vực:Đông Bắc Bộ\n->Dân số:1.803.950\n->Diện tích:3.851,40\n'
    },
    '98': {
      name: 'Bắc Giang',
      description: '\n->Mã Vùng:0204\n->Khu vực:Đông Bắc Bộ\n->Dân số:1.803.950\n->Diện tích:3.851,40\n'
    },
    '99': {
      name: 'Bắc Ninh',
        description: '\n->Mã Vùng:0222\n->Khu vực:Đồng bằng sông Hồng\n->Dân số:1.368.840\n->Diện tích:822,7\n'
    },
    // Thêm tương tự
  };

  const firstTwoDigits = bienks.substring(0, 2);
  const province = provinceMap[firstTwoDigits];
  return province || 'Không có';
}

async function run({ args, event, api }) {
  const input = args.join(' ');
  const { threadID, messageID } = event;
  const reply = (msg) => {
    api.sendMessage(msg, threadID, messageID);
  };

  if (!input) {
    return reply(`CHECK BIỂN SỐ XE \n==== [ HDSD ] ====\n┏━━━━━━━━━━━━┓\n┣➤${config.name} check 99  \n┣➤${config.name} check bình định\n┣➤${config.name} phatnguoi 51K-183.30\n┗━━━━━━━━━━━━┛`);
  }

  switch (args[0]) {
    case 'check':
      let result;
      if (!isNaN(args[1]) && args[1].length === 2) {
        result = layTenTinh(args[1]);
        reply(`[ ${args[1]} ] là biển số của tỉnh/thành: [ ${result.name} ]\nMô tả:\n┏━━━━━━━━━━━━┓\n ${result.description}\n┗━━━━━━━━━━━━┛`);
      } else {
        result = layBKS(input.trim().replace(/check/, ''));
        reply(`Tỉnh/thành [ ${input.replace(/check/, '')} ] có biển số là: [ ${result.licensePlate} ]\n->Mô tả:\n┏━━━━━━━━━━━━┓\n ${result.description}\n┗━━━━━━━━━━━━┛`);
      }
      break;

    case 'phatnguoi':
      const res = await phatNguoi({ args: args.slice(1) });
      if (res.result.isSuccess) {
        console.log('ok');
        const violations = res.result.violations;
        if (violations.length > 0) {
          let message = `Có ${violations.length} lỗi từ biển số: ${violations[0].licenseNumber}\n\n`;
          let i = 1;
          for (const violation of violations) {
            message += `Lỗi ${i}:\n`;
            message += `Màu sắc: ${violation.specs}\nLoại xe: ${violation.vehicleType}\nThời gian vi phạm: ${violation.violationTime}\nĐịa điểm vi phạm: ${violation.violationAddress}\nHành vi vi phạm: ${violation.behavior}\nTình trạng xử phạt: ${violation.status}\nNhà cung cấp: ${violation.provider}\n\n`;
            i++;
          }
          reply(message);
        } else {
          reply('Không tìm thấy thông tin vi phạm.');
        }
      } else {
        reply('Không tìm thấy thông tin vi phạm.');
      }
      break;

    default:
      reply('Vui lòng chọn 1 trong 2 case <check/phatnguoi>');
      break;
  }
}
module.exports = { config, phatNguoi, layBKS, layTenTinh, run };


/*
{
  "result": {
    "isSuccess": true,
    "violations": [
      {
        "licenseNumber": "51K-183.30",
        "specs": "Nền mầu trắng, chữ và số màu đen",
        "vehicleType": "Ô tô",
        "violationTime": "14:42, 17/08/2022",
        "violationAddress": "giao lộ TL784-Bời Lời,",
        "behavior": "Không chấp hành hiệu lệnh của đèn tín hiệu giao thông",
        "status": "Chưa xử phạt",
        "provider": "Đội Cảnh sát giao thông, Trật tự, Công an Thành phố Tây Ninh - Công an Thành phố Tây Ninh - Tỉnh Tây Ninh",
        "contactPhone": "",
        "contactAddress": "1. Đội Cảnh sát giao thông, Trật tự, Công an Thành phố Tây Ninh - Công an Thành phố Tây Ninh - Tỉnh Tây Ninh\nĐịa chỉ: Thành phố Tây Ninh\n2. Đội Cảnh sát giao thông, Trật tự, Công an huyện Hóc môn - Công an huyện Hóc môn - Thành phố Hồ Chí Minh\nĐịa chỉ: huyện Hóc môn\n"
      }
    ]
  }
}
https://www.carmudi.vn/blog-xe-hoi/bien-so-xe-cac-tinh/\
https://banktop.vn/danh-sach-63-tinh-thanh/
*/