//(һ)��ȡ�ļ�  ͬ�����첽֮��
//(1)�첽����
var fs = require('fs');
function afterRead(err,data){  //afterRead�ǻص�����
    if(err){
        //��������ִ�еķ���
    }else{
        console.log(data)
    }
}
fs.readFile('./json/index.txt',afterRead)  //readFile �첽��ȡ�ļ�    �첽�лص�
// �������е�ͬ������ִ�����˲�ִ���첽����
// �첽������Ҫ�ѻص���������
// �첽��������������߳� ����Ӱ���������ִ��

//��1���ص�����Ƕ�� ʵ�ֶ���첽������ ���֮��ʵ�ֻص�    ȱ�㣬��Ҫʱ�䳤 ����ɶ��Բ�
fs.readFile('./json/name.txt',function(err,name){   //Ƕ��ʵ�� ͬʱ�������
    fs.readFile('./json/age.txt',function(err,age){
        console.log(age,name)
    })
})

// �ڶ��ְ취
var person ={};
function show(){
    if(Object.keys(person).length==2){
        console.log(name,name)
    }
}
fs.readFile('./json/age.txt',function(err,age){
    person.age =age;
    show()
})
fs.readFile('./json/age.txt',function(err,name){
    person.name =name;
    show()
})


//(1)ͬ������
try{
    var data = fs.readFileSync('./json/index.txt','utf8')  // ͬ������ ͬ��û�з���ֵ
}catch(err){
    console.log(err) //�ݴ���
}

// ,��ÿһ��ͬ���������첽�������ǳɶԳ��ֵ�
//ͬ���������������̵߳�ִ�� ������û�з���֮ǰ����Ĵ��벻��ִ�к�������
//������Ҫ���ݻص����� ͨ����������ֵ���ս��






//(��)д�ļ� Ҳ��ͬ�����첽

    //�ص����err data ����fs.readFile������
var fs =require('fs')  //����ģ��
    //ͬ��������Ӳ�̵��ļ���д������
    fs.writeFileSync('./write.txt','д�������')

    //�첽����           ·��       д�������  ��ֹ����
    fs.writeFileSync('./write.txt','����', 'utf8' ,function(err){  //ֻҪһ������  д��ʧ�ܾ���err
    })


    //flag �Ǳ�ʾҪ�Դ��ļ����������Ͳ���
    //w ��ղ�д��
    // a ��ԭ�л�����׷��
    fs.writeFileSync('./write.txt','����', {flag:w} ,function(err){  //ֻҪһ������  д��ʧ�ܾ���err
    })
    //node �ṩ׷�ӵ����÷���
    fs.appendFile('./write.txt','д�������')


//��һ���ļ����Ƶ���һ���ļ�
    function copy(src,target){
        //�ȶ�ȡ
        fs.readFile(src,'�ļ�����(utf8)',function(err,data){
            fs.writeFile(target,data,function(err){
                if(err){
                    console.log('д��ɹ��ļ�')
                }
            })
        })
    }
    copy('ԭ�ļ�','Ҫ���Ƶĵط�')





