import SvgIcon from '@/components/SvgIcon';
import { FloatingPortal } from '@floating-ui/react';

const AddMenu = ({ refs, floatingStyles, getFloatingProps, setOpen }) => {
  return (
    <FloatingPortal>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
        className='z-50 rounded-md bg-white shadow'
      >
        <ul onClick={() => setOpen(false)} className='w-3xs  py-1 text-sm'>
          <li className='px-3 py-1 hover:bg-gray-100 flex items-center gap-2 cursor-pointer'>
            <SvgIcon iconName='start' fill='none' />
            开始
          </li>
          <li className='px-3 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer'>
            <SvgIcon iconName='end' fill='none' />
            结束
          </li>
        </ul>
      </div>
    </FloatingPortal>
  );
};

export default AddMenu;
