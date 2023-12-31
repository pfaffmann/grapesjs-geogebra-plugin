import { nanoid } from 'nanoid';

interface generateRandomIdProps {
  size?: number;
  prefix?: string;
  suffix?: string;
}

export const generateRandomId = (props?: generateRandomIdProps) => {
  if (!props) return nanoid(8);

  const { prefix = '', suffix = '', size = 8 } = props;

  return prefix + nanoid(size) + suffix;
};
