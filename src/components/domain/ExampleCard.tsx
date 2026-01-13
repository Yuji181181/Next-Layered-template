type ExampleCardProps = {
	id: number;
	name: string;
	description?: string | null;
	createdAt: Date;
	onEdit?: (id: number) => void;
	onDelete?: (id: number) => void;
};

export const ExampleCard = ({
	id,
	name,
	description,
	createdAt,
	onEdit,
	onDelete,
}: ExampleCardProps) => {
	return (
		<div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
			<div className="flex justify-between items-start">
				<div className="flex-1">
					<h3 className="text-lg font-semibold text-gray-900">{name}</h3>
					{description && <p className="mt-2 text-gray-600">{description}</p>}
					<p className="mt-3 text-sm text-gray-400">
						作成日: {createdAt.toLocaleDateString("ja-JP")}
					</p>
				</div>
				<div className="flex gap-2 ml-4">
					{onEdit && (
						<button
							type="button"
							onClick={() => onEdit(id)}
							className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
							aria-label="編集"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
							</svg>
						</button>
					)}
					{onDelete && (
						<button
							type="button"
							onClick={() => onDelete(id)}
							className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
							aria-label="削除"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
