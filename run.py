# coding:utf-8
import os
import shutil
import stat
import sys
import zipfile

import paramiko as paramiko
import argparse

username = ""
pwd = ""

def zip_ya(start_dir):
    start_dir = start_dir  # 要压缩的文件夹路径
    file_news = start_dir + '.zip'  # 压缩后文件夹的名字

    z = zipfile.ZipFile(file_news, 'w', zipfile.ZIP_DEFLATED)
    for dir_path, dir_names, file_names in os.walk(start_dir):
        f_path = dir_path.replace(start_dir, '')  # 这一句很重要，不replace的话，就从根目录开始复制
        f_path = f_path and f_path + os.sep or ''  # 实现当前文件夹以及包含的所有文件的压缩
        for filename in file_names:
            z.write(os.path.join(dir_path, filename), f_path + filename)
    z.close()
    return file_news


def run(host, local_path, target_path, file_dir):
    # 创建连接对象
    print host, local_path, target_path, file_dir
    if not host or not local_path or not target_path or not file_dir:
        print "缺少参数"
        return

    port = 22
    #username = "root"
    #pwd = "hadoop123456"

    local_path = local_path + "/" + file_dir + ".zip"
    target_path_file = target_path + "/" + file_dir + ".zip"

    print "local_path=" + local_path
    print "target_path_file=" + target_path_file

    transport = paramiko.Transport((host, port))
    transport.connect(username=username, password=pwd)

    sftp = paramiko.SFTPClient.from_transport(transport)
    sftp.put(local_path, target_path_file)

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh._transport = transport
    # 执行命令，标准输入，输出，错误
    # 解压
    cmd = "cd {} ;rm -rf {} ;mkdir {} ;cd {} ;unzip ../{}.zip ;rm -rf ../{}.zip;pwd".format(target_path, file_dir, file_dir,
                                                                                        file_dir, file_dir, file_dir)
    print cmd
    stdin, stdout, stderr = ssh.exec_command(cmd)
    # 获取命令结果
    outputs = stdout.read()
    print outputs
    transport.close()
    # print outputs


def delete_file(filePath):
    if os.path.exists(filePath):
        for fileList in os.walk(filePath):
            for name in fileList[2]:
                os.chmod(os.path.join(fileList[0], name), stat.S_IWRITE)
                os.remove(os.path.join(fileList[0], name))
        shutil.rmtree(filePath)
        print "delete ok"
    else:
        print "no filepath"



if __name__ == '__main__':

    parser = argparse.ArgumentParser(description='发布启动脚本')
    parser.add_argument("--hosts",type=str,default='10.87.106.233',help='输入IP地址，多个用逗号隔开')
    parser.add_argument("--remote_path",type=str,default='/app/tomcat-web/webapps',help='远程文件路径')
    parser.add_argument("--output_dir",type=str,default='hjwulianweb',help='本地文件路径')
    parser.add_argument("--build",type=str,default='npm run build:test',help='打包命令')
    parser.add_argument("--username",type=str,default='root',help='服务器用户名')
    parser.add_argument("--pwd",type=str,default='hadoop123456',help='服务器密码')

    args = parser.parse_args()
    hosts = args.hosts.split(",")
    remote_path = args.remote_path
    output_dir = args.output_dir
    build = args.build
    username = args.username
    pwd = args.pwd

    local_path = os.path.dirname(os.path.abspath(__file__)).replace("\\","/")

    #打包
    os.system("sudo npm install")
    os.system(build)
    # print current_dir
    # 压缩
    unzip_dir = local_path +"/" + output_dir
    zip_ya(unzip_dir)

    for i in range(len(hosts)):
        host = hosts[i]
        # 上传服务器，解压，删除等操作
        run(host, local_path, remote_path, output_dir)
    # 删除本地打包文件
    delete_file(unzip_dir)
    # 删除本地压缩文件
    os.remove(unzip_dir + ".zip")
