import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Select from 'react-select'

export default forwardRef(function InputSelect(
    { dataList, selectedOptionId, className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState(selectedOptionId);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <>
            <select
                {...props}
                className={
                    'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
                    className
                }
                ref={localRef}
                defaultValue={selectedOption}
                onChange={(e) => {
                    console.log('TUT', e.target.value)
                    setSelectedOption(e.target.value)
                }}
            >
                <option>Select One</option>
                {dataList.map((option) => (
                    <option value={option.id}
                            key={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </>
    );
});
