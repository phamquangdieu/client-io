'use client';
import { SendOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Space, Upload } from "antd";
import { map } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

export default function Home() {
  const [count, setCount] = useState<number>(0);
  const lastCount = useRef<number>(0);
  const [socket, setSocket] = useState<Socket>();
  const [message, setMessage] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [inbox, setInbox] = useState<string[]>(['']);
  const messRef = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<string>('');
  const ref = document.getElementsByClassName('mess-container');
  const numberElement = document.getElementById('number');
  useEffect(() => {
    const connectedSocket = io('http://localhost:3000');
    
    setSocket(connectedSocket);
    return () => {
      console.log(123465);
      
      connectedSocket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket && user) {
      socket.emit('login', { username: user })
    }
  }, [socket, user])

  useEffect(() => {
    socket?.on('message', (message) => {
      setInbox(prev => [...prev, message])
      const element = `<div class="left-mess">
        <div>${message}</div>
      </div>`
      if (ref) {
        ref[0].innerHTML += element;
        ref[0].scrollTo(0, ref[0].scrollHeight)
      }
      
    })
  }, [socket, ref])
  const prevData = useRef({value: '', color: 'white'});
  const prevData1 = useRef({value: '', color: 'white'});
  const prevData2 = useRef({value: '', color: 'white'});
  useEffect(() => {
    lastCount.current = count;
  }, [count]);
  useEffect(() => {
    socket?.on('test-emit', (data) => {
      
      const prevItem = document.getElementById(prevData.current.value);
      if (prevItem && data.value !== prevData.current.value) {
        prevItem!.style.backgroundColor = 'white';
        prevItem!.style.color = 'black';
      }
      
      const item = document.getElementById(data.value);
      
      if (item) {
        item!.style.backgroundColor = data.color;
        item!.style.color = 'white';
        prevData.current = data
      }
      // item?.style.backgroundColor = color;
      // item?.style.color = 'white'
    //  if (numberElement) {
    //   console.log(2, message);
    //   numberElement!.innerText =message
    //  }
      
    })
    socket?.on('test-emit-1', (data) => {
      const prevItem = document.getElementById(prevData1.current.value);
      if (prevItem && data.value !== prevData1.current.value) {
        prevItem!.style.backgroundColor = 'white';
        prevItem!.style.color = 'black';
      }
      
      const item = document.getElementById(data.value);
      
      if (item) {
        item!.style.backgroundColor = data.color;
        item!.style.color = 'white';
        prevData1.current = data
      }
    })
    socket?.on('test-emit-2', (data) => {
      
      const prevItem = document.getElementById(prevData2.current.value);
      if (prevItem && data.value !== prevData2.current.value) {
        prevItem!.style.backgroundColor = 'white';
        prevItem!.style.color = 'black';
      }
      
      const item = document.getElementById(data.value);
      
      if (item) {
        item!.style.backgroundColor = data.color;
        item!.style.color = 'white';
        prevData2.current = data
      }
    })
  }, [socket])

  // useEffect(() => {
  //   socket?.on('fileUploaded', (message) => {
  //     setImage(message.data)
      
  //   })
  // }, [socket])

  const sendMessage = () => {
    if (socket && user) {
      socket.emit('message', message, roomName, user);
    }
    const element = `<div class="right-mess">
    <div>${message}</div>
  </div>`
    if (ref) {
      ref[0].innerHTML += element;
    }
    setMessage('');
    ref[0].scrollTo(0, ref[0].scrollHeight)
  }

  const joinRoom = () => {
    if (socket) {
      socket.emit('joinRoom', roomName)
    }
  }

  const changeFile = (file) => {
   if (socket) {
    console.log(1234);
    console.log(file);
    if (file.file.status === 'done') {
      socket.emit('uploadFile', file.file)
    }
   }
        
  }

  const renderTable = () => {
    return map([0,1,2,3,4,5,6,7,8,9], item => {
      return (
        <div className="flex">
          {map([0,1,2,3,4,5,6,7,8,9], i => (
            <div className="caro-item" id={`${item}-${i}`}>{item}-{i}</div>
          ))}
      </div>
      )
    })
  }  

  return (
    <div className="h-full flex items-center justify-center flex-col">
      {renderTable()}
      <div>
      {count}
      <Button onClick={() => setCount(prev => prev + 1)}>
        Click
      </Button>
      </div>
      {/* <div className="flex">
        <div className="caro-item" id='1'>1</div>
        <div className="caro-item" id='2'>2</div>
        <div className="caro-item" id='3'>3</div>
      </div>
      <div className="flex">
        <div className="caro-item" id='4'>4</div>
        <div className="caro-item" id='5'>5</div>
        <div className="caro-item" id='6'>6</div>
      </div>
      <div className="flex">
        <div className="caro-item" id='7'>7</div>
        <div className="caro-item" id='8'>8</div>
        <div className="caro-item" id='0'>9</div>
      </div> */}
    </div>
    // <div className="h-full flex items-start justify-center">
    //   <div id="number" />
    //   {/* <img src={`data:image/jpeg;base64, ${image}`} alt='' style={{ width: 100 }} /> */}
    //   {image && (
    //     <audio>
    //     <source src={`data:audio/wav;base64, ${image}`} />
    // </audio>
    //   )}
    //   <div className="border-4 border-solid border-gray-400 rounded-xl">
    //     <div className="p-4 flex items-center">
    //       <UserOutlined style={{ fontSize: 30}} />
    //       <div className="flex-1">
    //           <input className="input-mess" value={user} onChange={e => setUser(e.target.value)} />
    //         </div>
    //     </div>
    //     <div className="mess-container flex flex-col gap-3 w-full p-2 overflow-auto" ref={messRef}>
    //       <div className="left-mess">
    //         <div>lorem ipsum</div>
    //       </div> 
    //       <div className="right-mess">
    //         <div>lorem ipsum lorem ipsum lorem ipsum lorem </div>
    //       </div>
    //       <div className="left-mess">
    //         <div>lorem ipsum</div>
    //       </div> 
    //       <div className="right-mess">
    //         <div>lorem ipsum lorem ipsum lorem ipsum lorem </div>
    //       </div>
    //       <div className="left-mess">
    //         <div>lorem ipsum</div>
    //       </div> 
    //       <div className="right-mess">
    //         <div>lorem ipsum lorem ipsum lorem ipsum lorem </div>
    //       </div>
    //       <div className="left-mess">
    //         <div>lorem ipsum</div>
    //       </div> 
    //       <div className="right-mess">
    //         <div>lorem ipsum lorem ipsum lorem ipsum lorem </div>
    //       </div>
    //     </div>
    //     {/* <Row>
    //       <Col span={8}>
    //         <Input value={roomName} onChange={(e) => setRoomName(e.target.value)} />
    //       </Col>
    //       <Col span={4}>
    //         <Button onClick={joinRoom}>Join</Button>
    //       </Col>
    //     </Row> */}
    //     <div className="w-full">
    //       <div className="w-full flex justify-between items-center">
    //         <div className="flex-1">
    //           <input className="input-mess" value={message} onChange={e => setMessage(e.target.value)} />
    //         </div>
    //         <div className="divider" />
    //         <div className="px-4 py-2">
    //         <button onClick={sendMessage}>
    //           <SendOutlined />
    //         </button>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="w-full">
    //       <div className="w-full flex justify-between items-center">
    //         <div className="flex-1">
    //           <Upload onChange={changeFile}>
    //             <Button icon={<UploadOutlined />}>Click to Upload</Button>
    //           </Upload>
    //         </div>
           
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
