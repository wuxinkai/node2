//�������ľ��
var http = require('http')


//����һ������  ָ������ ÿ���ͻ������� ������ʱ��ִ�еĺ���
//1�����ض���ip �ض��˿��ϼ��� �ͻ�������
// ����������ʱ��ִ�м������� ������Ӱ��
//request ����ͻ��˵�����  ���Դ��л�ȡ ���������
//response ������ͻ��˷�����Ӧ ��������ͻ��˷���Ӧ

var server=http.createServer(function(request,response){  //createServer ����������
        //���ñ����ʽ
        response.setHeader('Content-Type','text/html;charset=utf-8')  //�����������͡�

        console.log(request.method) //����ķ��� get post
        console.log(request.url) //����ķ���
        console.log(request.headers) //����ͷ

        //response.setHerder() //��Ӧͷ ��������Ӧ�������
        response.statusCode =404  //��Ӧ��
        response.write('')  //��Ӧ��


        response.write("hello"); //��ͻ��˷�����Ӧ  ������ֻ�����ַ�������buffer

        response.end() //˵�껰 �ҵ��绰   end֮��Ͳ�����write
})
//��8080�˿ڽ��м���  ��������localhost
server.listen('8080','localhost');


//��1��һ����վ�ķ��ʹ���
//����� ΢��  �����������һ�� http����  �Ȱ���������   ��������ϵͳ���棨�ŵ����Ч�ʣ�ȱ��  �޸����ݻ�����Ļ��Ǿ�����   ��  ��ȡ����host  ����dns����   ��Ӫ��dns����   �Ҹ��� �ͻ���ͨ������˿������������TCP�������� ����TC���� �����Ӻ�������ͷ���http���� ���������յ�http���� ���������·���Ͳ��� ������̨��һЩ����֮��������������Ӧҳ�� �ͻ��ˣ�����������յ�http��Ӧ  �������еõ�http��Ӧ�����html���� ����html������н���  �������������� ���÷������ϵ���Դ�������css js ͼ ����Ƶ �������������������������