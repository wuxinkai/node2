var fs = require('fs');
//����Ŀ¼
fs.mkdir('text',function(err){  //����һ����text��Ŀ¼
    if(err){
        console.log('����ʧ��')
    }else{
        console.log('�����ɹ�')
    }
})
//����Ŀ¼��ʱ�� ��Ŀ¼�������
fs.mkdir('text/t',function(err){  //��text�´���һ����t��Ŀ¼
    if(err){
        console.log('����ʧ��')
    }else{
        console.log('�����ɹ�')
    }
})

//��ȡĿ¼�µ��ļ�
fs.readdir('./text',function(err,files){
    console.log(files) //��files�µ��ļ����������� [ 'box.txt', 'list.json', 't' ]
})


// ��ȡһ���ļ���Ŀ¼����
fs.readdir('./text',function(err,files){
    files.forEach(function(file){
        fs.stat(file,function(state){
            console.log(state.isDirectory())  //�Ƿ���Ŀ¼
            console.log(state.isFile())  //�Ƿ����ļ�
            console.log(state.size)
        })
    })
})

//�ж�һ���ļ����ļ����Ƿ����
fs.exists('./text',function(exists){
    console.log(exists)
})

//�ϲ�����·��
console.log(path.jion('./text','mysql.json'))

//�ָ���
    console.log(path.sep) //  \
    console.log(__filename) //��ȡ��ǰģ��ľ���·��
    console.log(__dirname) //��ȡ  ��ǰģ�����ڵľ���Ŀ¼
    console.log(path.basename('path.js','js')) //��ȡ·��������ļ���
    console.log(path.extname('path.js')) //��ȡ�ļ�����չ��
    console.log(path.resolve('book','node.json')) // ��һ�����·������һ������·��



//��Ŀ  �����Ԫ�ز�����  ����Ҫ�Զ�����
function makep(path,callbck){
    // �Ѳ���ת������
    // �����ж�Ŀ¼�Ƿ���� ������ھ�����ȥ ��������ھʹ�����Ŀ¼
    // ����һ�����յ�Ŀ¼
}
