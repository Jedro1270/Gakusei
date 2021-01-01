import { Box, styled, Typography, Button, TextField, Icon, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatFeed } from 'react-chat-ui';
import SendIcon from '@material-ui/icons/Send';
import { useHistory } from 'react-router-dom';

import changeTitle from '../../../../Redux/Actions/ChangeTitle';
import CustomAjax from '../../../../CustomAjax';
import verifyToken from '../../Helper Functions/verifyToken';
import NoGroupSelectedDialog from '../Error Dialogs/NoGroupSelectedDialog';


export default function Chat() {

    const [messages, setMessages] = useState([]);
    const [composedMessage, setComposedMessage] = useState('');
    const [messagesLimit, setMessagesLimit] = useState(20);

    const token = useSelector((state) => { return state.tokenState });
    const currentGroup = useSelector((state) => { return state.currentGroupState });
    const user = useSelector((state) => { return state.userState });

    const dispatch = useDispatch();
    const history = useHistory();

    const ajax = new CustomAjax();

    const getMessages = () => {
        ajax.get(`http://localhost:2727/api/chat/${currentGroup.id}?limit=${messagesLimit}`, token);
        ajax.stateListener((response) => {
            response = JSON.parse(response);

            const newMessages = [];

            for (const message of response.messages) {
                const parsedMessage = {
                    id: message.author_id === user.id ? 0 : message.author_id,
                    message: message.message_content,
                    senderName: message.username
                }

                newMessages.unshift(parsedMessage);
            }

            setMessages(newMessages);
        });
    }
    
    const uploadMessages = (message) => {
        const data = {
            message: message
        }

        ajax.post(`http://localhost:2727/api/chat/${currentGroup.id}`, data, true, token);
    }

    const handleMessageSent = () => {
        const message = {
            id: 0,
            message: composedMessage,
        }

        uploadMessages(message);
    }

    dispatch(changeTitle('Chat'));

    useEffect(() => {
        verifyToken(token, history);

        const interval = setInterval(() => {
            getMessages();
        }, 500);

        return () => clearInterval(interval)
    }, [messagesLimit]);

    return (
        <ChatPageBody>
            <NoGroupSelectedDialog 
                page='Chat'
            />

            <LoadMoreButton onClick={() => {
                setMessagesLimit(messagesLimit + 20);
            }}>
                Load More
            </LoadMoreButton>

            <ChatMessagesArea>
                <ChatFeed 
                    messages={ messages }
                    showSenderName 
                    bubblesCentered={ true }
                    bubbleStyles={
                        {
                            text: {
                                fontSize: 15,
                                color: 'black'
                            },
                            chatbubble: {
                                borderRadius: 75,
                                padding: 15
                            }
                        }
                    }
                />
            </ChatMessagesArea>

            <InputArea>
                <MessageInput 
                    variant='outlined'
                    placeholder='Type a message...'
                    multiline={ true }
                    onChange={(event) => {
                        setComposedMessage(event.target.value);
                    }}
                    value={ composedMessage }
                />
                <Button 
                    variant='contained' 
                    endIcon={ <SendIcon /> }
                    onClick={() => {
                        handleMessageSent();
                        setComposedMessage('');
                    }}
                >
                    Send
                </Button>
            </InputArea>
        </ChatPageBody>
    );
}

const ChatMessagesArea = styled(Box)({
    marginBottom: '60px',
    overflow: 'auto',
    height: '100%'
});

const ChatPageBody = styled(Box)({
    backgroundColor: 'black',
    height: '75%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column'
});

const MessageInput = styled(TextField)({
    backgroundColor: 'white',
    borderRadius: '5px',
    flex: '5',
});

const InputArea = styled(Box)({ // Make this scrollable
    position: 'fixed',
    bottom: '20px',
    right: '0px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
});

const LoadMoreButton = styled(Button)({
    color: 'white'
});