import type { InputHTMLAttributes } from "react";

type InputProps = {
	label?: string;
	error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
	label,
	error,
	id,
	className = "",
	...props
}: InputProps) => {
	const inputId = id || props.name;

	return (
		<div className="flex flex-col gap-1">
			{label && (
				<label htmlFor={inputId} className="text-sm font-medium text-gray-700">
					{label}
				</label>
			)}
			<input
				id={inputId}
				className={`
          px-4 py-2 border rounded-lg transition-colors
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
          ${className}
        `}
				{...props}
			/>
			{error && <span className="text-sm text-red-500">{error}</span>}
		</div>
	);
};
