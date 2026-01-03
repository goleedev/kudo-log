import { type Entry } from '../types/database';

interface EntryListProps {
  entries: Entry[];
  onDelete: (id: string) => void;
}

export default function EntryList({ entries, onDelete }: EntryListProps) {
  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'praise':
        return {
          emoji: '👏',
          label: '칭찬받음',
          color: 'bg-blue-100 text-blue-700',
        };
      case 'small_win':
        return {
          emoji: '✨',
          label: '작은 성과',
          color: 'bg-green-100 text-green-700',
        };
      case 'learning':
        return {
          emoji: '📚',
          label: '배움',
          color: 'bg-purple-100 text-purple-700',
        };
      default:
        return { emoji: '📝', label: type, color: 'bg-gray-100 text-gray-700' };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">아직 기록이 없습니다</p>
        <p className="text-sm mt-2">첫 성과를 기록해보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map((entry) => {
        const typeInfo = getTypeInfo(entry.type);

        return (
          <div
            key={entry.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${typeInfo.color}`}
                  >
                    {typeInfo.emoji} {typeInfo.label}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(entry.date)}
                  </span>
                </div>

                <h3 className="font-medium text-gray-900 mb-1">
                  {entry.title}
                </h3>

                {entry.detail && (
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    {entry.detail}
                  </p>
                )}
              </div>

              <button
                onClick={() => onDelete(entry.id)}
                className="ml-4 text-gray-400 hover:text-red-600 transition-colors"
                title="삭제"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
