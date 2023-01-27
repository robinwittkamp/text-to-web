import clsx from 'clsx';
import PropTypes from 'prop-types';

const variants = {
  speech:
    'w-14 border border-neutral-300 bg-neutral-100 text-neutral-700 hover:enabled:border hover:enabled:border-green-500 hover:enabled:bg-green-100 hover:enabled:text-green-900 disabled:cursor-not-allowed disabled:opacity-50',
  submit:
    'w-32 border border-blue-600 bg-blue-500 text-white hover:enabled:border-blue-700 hover:enabled:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50',
  resubmit:
    'w-14 border border-neutral-300 bg-neutral-100 text-neutral-700 hover:enabled:border-sky-500 hover:enabled:bg-sky-200 hover:enabled:text-sky-900 disabled:cursor-not-allowed disabled:opacity-50',
  undo: 'w-14 border border-neutral-300 bg-neutral-100 text-neutral-700 hover:enabled:border-yellow-500 hover:enabled:bg-yellow-100 hover:enabled:text-yellow-900 disabled:cursor-not-allowed disabled:opacity-50',
  redo: 'w-14 border border-neutral-300 bg-neutral-100 text-neutral-700 hover:enabled:border-yellow-500 hover:enabled:bg-yellow-100 hover:enabled:text-yellow-900 disabled:cursor-not-allowed disabled:opacity-50',
  reset:
    'w-14 border border-neutral-300 bg-neutral-100 text-neutral-700 hover:enabled:border-red-500 hover:enabled:bg-red-200 hover:enabled:text-red-900 disabled:cursor-not-allowed disabled:opacity-50',
  code: 'w-14 border',
};

const Button = ({
  children,
  disabled,
  // name,
  onClick,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
  variant,
}) => {
  const variantClasses = variants[variant];

  const classes = clsx(`h-14 rounded-xl px-5 py-3 font-bold ${variantClasses}`);

  return (
    <button
      className={classes}
      type="button"
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      // name={name}
      disabled={disabled}
    >
      <div className="flex items-center justify-center space-x-3">{children}</div>
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  // name: PropTypes.string,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onTouchStart: PropTypes.func,
  onTouchEnd: PropTypes.func,
  variant: PropTypes.oneOf(['speech', 'submit', 'resubmit', 'undo', 'redo', 'reset', 'code'])
    .isRequired,
};

Button.defaultProps = {
  disabled: false,
  // name: null,
  onClick: null,
  onMouseDown: null,
  onMouseUp: null,
  onTouchStart: null,
  onTouchEnd: null,
};

export default Button;
