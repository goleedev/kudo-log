import { useState, type FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { type EntryType } from '../types/database';
import EntryTypeSelector from './EntryTypeSelector';

interface EntryFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EntryForm({ onSuccess, onCancel }: EntryFormProps) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<EntryType>('small_win');
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('entries').insert({
        user_id: user.id,
        type,
        title,
        detail: detail || null,
        date,
      });

      if (error) throw error;

      setTitle('');
      setDetail('');
      setType('small_win');
      onSuccess();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('저장 실패: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          타입
        </label>
        <EntryTypeSelector value={type} onChange={setType} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          제목 *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="예: 코드 리뷰에서 좋은 피드백 받음"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          날짜
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          상세 설명 (선택)
        </label>
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          rows={4}
          placeholder="구체적인 내용을 적어주세요..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '저장중...' : '저장'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          취소
        </button>
      </div>
    </form>
  );
}
