export const formatPrice = function (input) {
  try {
    if (!input) return "";
    // const
    // if () {
    //   return 0;
    // }
    return parseInt(input)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
      .replace(".00", "")
      .replace(/,/g, ".");
  } catch (error) {}
  return "0";
};

export const nonVietnamese = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll(" ", "");
  // const vietnamesePattern =
  //   /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/gi;

  // Replace Vietnamese characters with their base character
  // const result = input.replace(vietnamesePattern);

  // return result;
};

const units = [
  "",
  "một",
  "hai",
  "ba",
  "bốn",
  "năm",
  "sáu",
  "bảy",
  "tám",
  "chín",
];
const tens = [
  "",
  "mười",
  "hai mươi",
  "ba mươi",
  "bốn mươi",
  "năm mươi",
  "sáu mươi",
  "bảy mươi",
  "tám mươi",
  "chín mươi",
];
const hundreds = [
  "",
  "một trăm",
  "hai trăm",
  "ba trăm",
  "bốn trăm",
  "năm trăm",
  "sáu trăm",
  "bảy trăm",
  "tám trăm",
  "chín trăm",
];

function belowThousandToVietnamese(num) {
  let result = "";
  let hundred = Math.floor(num / 100);
  let ten = Math.floor((num % 100) / 10);
  let unit = num % 10;

  if (hundred > 0) {
    result += hundreds[hundred] + " ";
  }
  if (ten > 1) {
    result += tens[ten] + " ";
    if (unit > 0) {
      result += units[unit] + " ";
    }
  } else if (ten === 1) {
    result += "mười " + (unit > 0 ? units[unit] + " " : "");
  } else {
    if (unit > 0 || num === 0) {
      result += units[unit] + " ";
    }
  }
  return result.trim();
}

export function numberToVietnameseWords(num) {
  if (num === 0) return "không đồng";
  const units = ["", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ"];
  let parts = [];
  let unitIndex = 0;

  while (num > 0) {
    let part = num % 1000;
    if (part > 0) {
      let partInWords = belowThousandToVietnamese(part) + units[unitIndex];
      parts.unshift(partInWords);
    }
    num = Math.floor(num / 1000);
    unitIndex++;
  }

  return parts.join(" ").trim() + " đồng";
}
