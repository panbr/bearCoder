#coding=utf8
import requests
from bs4 import BeautifulSoup
import sqlite3
import time

# URL
BASE_URL = 'http://map.mapbar.com/t_guangzhou_1001_more/'
# 请求头
headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36'}
# 等待时间
wait = 3

# 抓取主函数
def startGrab():

    # 可能因为超时等网络问题造成异常，需要捕获并重新抓取
    try:
        page = requests.get(BASE_URL, headers=headers, timeout=20)
        print("连接BASE_URL成功！")
    except Exception as e:
        print("抓取异常：", e)

    # 使用BeautifulSoup规范化网页并生成对象
    soup = BeautifulSoup(page.content, "lxml")

    fetch_data = soup.select(".latterIndexRight a")

    for item in fetch_data:
        href = item["href"]
        name = item.text
        time.sleep(wait) # 等待
        fetchDetail(href, name)

# 抓取学校详情
def fetchDetail(url, name):

    print("")
    print("开始连接 ", url)
    try:
        page = requests.get(str(url), headers=headers, timeout=20)
        soup = BeautifulSoup(page.content, "lxml")
        fetch_data = soup.select(".infoPhoto ul")
    except:
        print("连接失败...", url)

    try:
        school_info = {
            "name": name,
            "link": url,
            "update_time": fetch_data[0].find_all("li")[0].text.split("：")[1].strip(),
            "phone": fetch_data[0].find_all("li")[2].contents[2].replace("\t", "").strip(),
            "classify_name": fetch_data[0].find_all("li")[3].text.split("：")[1].strip(),
            "address": ''.join(fetch_data[0].select("li")[1].get_text().split()).split("：")[1].strip(),
            "classify": "primary",
        }
        # 存到数据库
        saveToSqlite(school_info)
    except:
        print("获取错误：", url)
        pass

# 保存到本地Sqlite
def saveToSqlite(info):

    print("连接数据库...")

    name = info['name']
    link = info['link']
    update_time = info['update_time']
    phone = info['phone']
    classify = info['classify']
    address = info['address']
    classify_name = info['classify_name']

    # 连接数据库并插入相应数据
    try:
        con = sqlite3.connect("../db/school.db")
        cur = con.cursor()
        sql = "insert into school values ('%s', '%s','%s','%s','%s','%s', '%s')" % (name, link, update_time, phone, classify, address, classify_name)
        cur.execute(sql)
        con.commit()
        print("插入数据库成功！", info['name'])
    except Exception as e:
        print("插入数据失败...", e)

# 创建 school 表
def create_table(name):
    con = sqlite3.connect("../db/school.db")
    cur = con.cursor()
    cur.execute("create table school (name text NULL,link text NULL,update_time text NULL,phone text NULL,classify text NULL,address text NULL,classify_name text NULL)")
    con.commit()

# 查询表
def query_table(name):
    con = sqlite3.connect("../db/school.db")
    cur = con.cursor()
    data = cur.execute("SELECT * FROM " + name)
    for row in data:
        print(row)
    con.close()

if __name__ == '__main__':
    startGrab()



