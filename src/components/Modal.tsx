import {HStack, IconButton, Modal as ModalBase, Text} from 'native-base';
import React from 'react';
import X from 'phosphor-react-native/src/icons/X';

export interface IModalProps {
  title: string;
  isDanger?: boolean;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal(props: IModalProps) {
  return (
    <ModalBase isOpen={props.isOpen} onClose={props.onClose}>
      <ModalBase.Content
        w="full"
        mx={'4'}
        borderColor={props.isDanger ? '#E41C1C' : '#8A3FFC'}
        borderStyle={'solid'}
        borderWidth={1}>
        <HStack w={'full'} py={'3'} position={'relative'}>
          <Text
            fontWeight={'normal'}
            fontSize={'xl'}
            textAlign={'center'}
            color={props.isDanger ? '#E41C1C' : '#8A3FFC'}
            flexGrow={1}
            alignSelf={'center'}>
            {props.title}
          </Text>

          <IconButton
            position={'absolute'}
            right={'0'}
            top={'0'}
            icon={<X size={32} color="#8A3FFC" />}
            onPress={props.onClose}
          />
        </HStack>

        <ModalBase.Body>{props.children}</ModalBase.Body>
      </ModalBase.Content>
    </ModalBase>
  );
}
