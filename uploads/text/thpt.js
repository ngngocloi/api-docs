const fs = require('fs');
const axios = require('axios');

async function fetchData(studentId, retries = 3) {
    try {
        const response = await axios.post("http://tracuudiem.langson.edu.vn/tra_cuu_diem_tn_thpt.php", `search_text=${studentId}`, {
            headers: {
                "accept": "text/html, */*; q=0.01",
                "accept-language": "vi,en;q=0.9,vi-VN;q=0.8,en-US;q=0.7,zh-CN;q=0.6,zh;q=0.5",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-requested-with": "XMLHttpRequest",
                "Referer": "http://tracuudiem.langson.edu.vn/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            }
        });
        const data = response.data;
        const result = extractScores(data);
        console.log(`Đã lấy thành công số báo danh ${studentId}`);
        return { id: studentId, ...result };
    } catch (error) {
        if (retries > 0) {
            console.log(`Thử lại số báo danh ${studentId}. Lần thử còn lại: ${retries}`);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Introduce a delay before retrying
            return await fetchData(studentId, retries - 1);
        } else {
            console.error(`Không thể lấy ${studentId}:`, error.message);
            return null;
        }
    }
}

function extractScores(data) {
    let idMatch = data.match(/<b>Số báo danh<\/b>:\s*(\d+)<\/br>/);
    let scoresInfoMatch = data.match(/<b>Điểm các bài thi<\/b>:(.*?)<\/font>/s);

    if (!idMatch || !scoresInfoMatch ) {
        throw new Error('Không thể lấy');
    }

    let id = idMatch[1];
    let scoresInfo = scoresInfoMatch[1];
    let subjects = ["Toán", "Ngữ văn", "Vật lí", "Hóa học", "Sinh học", "KHTN", "Lịch sử", "Địa lí", "GDCD", "KHXH", "Tiếng Anh"];
    let scores = {};

    subjects.forEach(subject => {
        let subjectRegex = new RegExp(`${subject}\\s*:\\s*(\\d+\\.\\d+)`, 'i');
        let scoreMatch = scoresInfo.match(subjectRegex);
        if (scoreMatch) {
            scores[subject] = parseFloat(scoreMatch[1]);
        }
    });

    return {  id, scores };
}

async function fetchAllData() {
    const startId = 10000001;
    const endId = 10009600;
    let allData = [];

    for (let id = startId; id <= endId; id++) {
        let data = await fetchData(id);
        if (data) {
            allData.push(data);
        }
        await new Promise(resolve => setTimeout(resolve, 10)); // Introduce a delay of 1 second between requests
    }

    fs.writeFileSync('thpt.json', JSON.stringify(allData, null, 2));
    console.log('Đã ghi vào tệp thpt.json thành công.');
}

fetchAllData();
