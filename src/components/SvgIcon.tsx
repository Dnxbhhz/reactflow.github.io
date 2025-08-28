// src/components/SvgIcon/index.tsx
import React from 'react';

interface SvgIconProps {
  iconName: string;
  size?: number | string;
  color?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  fill?: string;
  stroke?: string;
  style?: Record<string, string | number>;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  iconName,
  size = 16,
  color = 'currentColor',
  className = '',
  fill = '',
  stroke = '',
  onClick,
  style,
  ...props
}) => {
  return (
    <svg
      className={`svg-icon ${className}`}
      style={{
        ...style,
        width: size,
        height: size,
        fill: fill || color,
        stroke: stroke || color,
      }}
      onClick={onClick}
      {...props}
    >
      <use href={`#icon-${iconName}`} />
    </svg>
  );
};

export default SvgIcon;
