/**
 * アプリケーション全体の設定
 */
export const appConfig = {
  /**
   * NewsPopupの設定
   */
  newsPopup: {
    /**
     * ポップアップを有効にするかどうか
     * true: 有効（通常通り表示される。ただしlocalStorageの設定に依存）
     * false: 無効（完全に非表示）
     */
    enabled: true,
    
    /**
     * 開発時のテスト用設定
     * true: localStorageの設定を無視して常に表示
     * false: 通常どおりlocalStorageの設定に従う
     */
    forceShow: true,
    
    /**
     * ポップアップが表示されるまでの遅延時間（ミリ秒）
     */
    delay: 500,
  }
}; 