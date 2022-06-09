import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

/*

Nesse modal serão exibidos uma imagem e o link.

1 - [X] Essa imagem deve ter como largura máxima 900px e como altura máxima 600px,
mantendo a proporção da imagem dependendo de qual dessas duas medidas chegar no
valor máximo primeiro.


Por exemplo, um wallpaper de celular tem a altura muito maior que a largura, já um
wallpaper de um monitor widescreen tem a largura muito maior que a altura. Portanto,
um exemplo prático desse dois casos seria os prints abaixo:


2 - [x] Em relação ao link, ele deve ser renderizado abaixo da imagem com o texto Abrir
original que aponta para o endereço onde a imagem está hospedada no ImgBB. Ao
clicar no link, ele deve abrir uma nova aba no navegador

*/
export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  if (isOpen) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="900px" w="unset">
          <ModalBody d="flex" alignItems="center" justifyContent="center">
            <Image src={imgUrl} maxW={900} maxH={600} backgroundSize="cover" />
          </ModalBody>
          <ModalFooter justifyContent="flex-start" backgroundColor="pGray.800">
            <Link href={imgUrl} isExternal>
              Abrir original
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  return null;
}
