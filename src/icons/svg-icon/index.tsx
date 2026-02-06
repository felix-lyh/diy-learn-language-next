import { iconMap, IconName } from './icon-map';

type SvgIconProps = {
    name: IconName;
    width?: number | string;
    height?:number | string;
    color?: string;
    className?: string;
};

const SvgIcon = ({ name, width = 24,height, color = 'currentColor', className='' }: SvgIconProps) => {
    const IconComponent = iconMap[name];

    if (!IconComponent) return null;

    return <div style={{width,height:height||width,color}} className={`flex ${className}`}>{IconComponent}</div>
};

export default SvgIcon;
