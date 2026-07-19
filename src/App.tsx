import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';

function App() {
  // 修改状态存储方式：直接存储对象而不是拼接后的字符串
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('content').select('*');
      if (error) {
        console.error("数据库错误:", error);
      } else if (data && data.length > 0) {
        // 直接存入对象，不用拼接字符串
        setContent(data[0].data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div>加载中...</div>;
  if (!content) return <div>未找到内容，请检查数据库。</div>;

  return (
    <div style={{ padding: '50px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h1 style={{ color: '#0070f3' }}>{content.company_name}</h1>
        <p style={{ fontSize: '18px', color: '#333' }}>{content.description}</p>
        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
          联系电话: {content.phone}
        </div>
      </div>
    </div>
  );
}

export default App;
