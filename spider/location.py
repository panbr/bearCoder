#coding=utf8
'''
百度地图接口获得位置坐标
http://api.map.baidu.com/geocoder/v2/
'''

import requests
import sqlite3

# 百度地图正/逆地理编码服务
BAIDU_URL = 'http://api.map.baidu.com/geocoder/v2/'
APP_AK = '3OY9aPVboBzGFyARkUWCbVrPrGNZOPF7'

# 地理编码
def getLocationCode(name=''):

    params = {
        'address': name,
        'output': 'json',
        'ak': APP_AK,
    }

    try:
        req = requests.get(BAIDU_URL, params=params)
        print('请求地址：', req.url)
        res = req.json()
        if res['status'] == 0:
            lat = res['result']['location']['lat'] #纬度值
            lng = res['result']['location']['lng'] #经度值
            return (lng, lat)

    except Exception as e:
        print("获取地理编码异常：", e)


# 逆地理编码
def getLocationName(arr):

    # 测试用
    # arr = ','.join(('23.391656195950326', '113.64845662568958'))

    params = {
        'location': arr,
        'output': 'json',
        'pois': 1,
        'ak': APP_AK,
    }

    try:
        req = requests.get(BAIDU_URL, params=params)
        res = req.json()
        if res['status'] == 0:
            return res['result']

    except Exception as e:
        print("获取逆地理编码异常：", e)


# 查询数据库
def updateData(table='school'):
    con = sqlite3.connect("../db/school.db")
    data = con.execute("SELECT address FROM " + table)
    for row in data:
        print('')
        position = getLocationCode(row[0])
        if position is not None:
            try:
                con.execute("UPDATE " + table + " set position='" + str(position[0]) + "," + str(position[1]) + "' where address='" + row[0] + "'")
                print("更新", row[0], "成功！")
            except Exception as e:
                print("更新", row[0], "失败...")
                print("失败原因：", e)
    con.commit()
    con.close()

if __name__ == '__main__':

    # print(getLocationCode())
    updateData()

