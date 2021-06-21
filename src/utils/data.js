let data =  {
    nodes:[
                {
                    "id": "1",
                    "name":"BI分析数据中心支撑平台",
                    "labels": "产品",
                    "properties": {},
                    
                }, 
                {
                    "id": "2",
                    "name":"用户登录",
                    "labels": "功能",
                    "properties": {
                        
                        
                    },
                   
                }, 
                {
                    "id": "3",
                    "name":"中行外汇结算接口应用",
                    "labels": "项目",
                    "properties": {
                        
                        
                    },
                    
                }, 
                {
                    "id": "4",
                    "name":"使用密码进行登录",
                    "labels": "用例",
                    "properties": {
                        
                        
                    },
                    
                }, 
                {
                    "id": "5",
                    "name":"扫描行信二维码登录",
                    "labels": "用例",
                    "properties": {
                        
                        
                    },
                    
                }, 
                {
                    "id": "6",
                    "name":"客户关系CRM系统",
                    "labels": "产品",

                    "properties": {
                        
                    },
                    
                }, 
                {
                    "id": "7",
                    "name":"即时转账",
                    "labels": "功能",
                    "properties": {
                       
                        
                    },
                  
                }, 
                {
                    "id": "8",
                    "name":"中行移动端APP研发二期",
                    "labels": "项目",
                    "properties": {
                        
                        
                    },
                    
                }, 
                // {
                //     "id": "9",
                //     "name":"节点2",
                //     "labels": "组群4",
                //     "properties": {
                //         "公司名": "网易",
                //         "地址": "北京",
                        
                //     },
                    
                // },
                // {
                //     "id": "17",
                //     "name":"节点2",
                //     "labels": "组群3",
                //     'isMulitChild':true,

                //     "properties": {
                //         "公司名": "网易",
                //         "地址": "北京",
                        
                //     },
                    
                // }, 
    ],
    relationships:[
        {
            "id": "1",
            "type": "产品功能",
            "startNode": "1",
            "endNode": "2",
            
        }, 
        {
            "id": "2",
            "type": "项目需求",
            "startNode": "3",
            "endNode": "2",
            
        }, 
        {
            "id": "3",
            "type": "测试用例",
            "startNode": "2",
            "endNode": "4",
           
        }, 
        {
            "id": "4",
            "type": "测试用例",
            "startNode": "2",
            "endNode": "5",
            
        }, 
        {
            "id": "5",
            "type": "产品功能",
            "startNode": "6",
            "endNode": "2",
            
        }, 
        {
            "id": "6",
            "type": "测试用例",
            "startNode": "7",
            "endNode": "4",
            
        }, 
        {
            "id": "7",
            "type": "产品功能",
            "startNode": "6",
            "endNode": "7",
            
        }, 
        {
            "id": "8",
            "type": "产品功能",
            "startNode": "8",
            "endNode": "7",
            
        },
        // {
        //     "id": "26",
        //     "type": "诉讼关系",
        //     "startNode": "6",
        //     "endNode": "17",
            
        // },
        // {
        //     "id": "27",
        //     "type": "诉讼关系",
        //     "startNode": "17",
        //     "endNode": "6",
            
        // },
        // {
        //     "id": "28",
        //     "type": "诉讼关系",
        //     "startNode": "17",
        //     "endNode": "6",
            
        // }
    ],
    userPamas:{
        "产品":{
            NodeTextPosX:0,
            NodeTextPosY:0,
            NodeSize:0,
            NodeTextSize:0,
            color:'#73CD7C'
        },
        '项目':{
            NodeTextPosX:0,
            NodeTextPosY:0,
            NodeSize:0,
            NodeTextSize:0,
            color:'#E7569F'
        },
        '功能':{
            NodeTextPosX:0,
            NodeTextPosY:0,
            NodeSize:0,
            NodeTextSize:0,
            color:'#9256E1'
        },
        '用例':{
            NodeTextPosX:0,
            NodeTextPosY:0,
            NodeSize:0,
            NodeTextSize:0,
            color:'#F3D647'
        }
    },
}


export default data